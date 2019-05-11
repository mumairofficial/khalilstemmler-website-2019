---
templateKey: blog-post
title: Migrate Primary Keys to UUIDs - Sequelize/Node
date: '2019-04-20T00:05:26-04:00'
description: >-
  This is how and why I took upon myself the hellish task of migrating an existing Sequelize + TypeScript application to use UUIDs instead of auto-incrementing primary keys.
tags:
  - Database
  - DDD
  - Sequelize
category: Domain-Driven Design
image: /img/blog/uuid/uuid-1.png
published: true
---

In my [domain-driven design](/articles/categories/domain-driven-design/) journey, I've come to realize that auto-incremented IDs just aren't gonna cut it for me anymore for my [Sequelize](http://docs.sequelizejs.com/) + Node.js + TypeScript backend.

## Why?

The reason for the migration is that we want the Domain Layer[^1] code to be able create Domain Objects _without_ having to rely on a **round-trip to the database**. 

With auto-incremented ids, that's not possible (unless of course, we were to do some [hacky things](https://www.tutorialspoint.com/how-to-get-the-next-auto-increment-id-in-mysql)).

Being able to create Domain Objects without having to rely on a db connection is desireable because it means that our unit tests can run **really quickly**, and it's a good idea to separate concerns between *creating objects* and *persisting objects*.

This technique also simplifies how we can use **Domain Events** to allow other subdomains and bounded contexts to **react** to changes in our systems.

**If you're interested in other approaches for generating identities in Domain-Driven Design, see <u>"Chapter 5: Entities"</u> in Vaughn Vernon's "[Implementing Domain-Driven Design](https://www.amazon.ca/gp/product/0321834577?ie=UTF8&tag=stemmlerjs09-20&camp=15121&linkCode=xm2&creativeASIN=0321834577)" for a more detailed discussion.**

I realized that there's not a lot of information out there for how to migrate an existing production database with over 40 tables from auto-incremented IDs to UUIDs[^2], so here's me documenting how I got it done.


***

## Gettin' er' done

The best option was to just re-create a new database with the same tables but with different primary key data types. From there, I could insert the old data into the new database, and then swap out production databases.

### Step 1: Dump the prod database + import the schema

I'm using MySQL so I was able to dump the entire production database to a self-contained file then import it locally with MySQL workbench using the `Data Import` tool.

### Step 2: Create JSON datafiles of each table's data

The next thing I did was export all of the rows from each model to json files in the format of `out/TableName.json`.

```typescript
import models from '../../src/infra/models'
import * as fs from 'fs'
import * as path from 'path'

/**
 * Each file gets written out to `/out/{modelName}.json`
 */

const writeToFile = (filePath, data: any) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path.join(__dirname, filePath), 
      JSON.stringify(data), 'utf8', () => {
      return resolve();
    });
  })
}


class CreateDatabaseData {
  // All sequelize models
  private models: any

  constructor (models: any) {
    this.models = models;
    this.init();
  }

  async init () {
    // ['User', 'Product', etc...]
    const modelNames = Object.keys(models);

    for(const modelName of modelNames) {
      const Model = this.models[modelName];
      console.log("Getting all the data for: " + modelName)
      // Select * from current moodel
      const rawData = await Model.findAll({});
      console.log('Writing....');
      // Write it to the json file in the out/ folder
      await writeToFile('out/' + modelName + ".json", rawData);
    }

    console.log('Done.')
    process.exit(1);
  }
}

new CreateDatabaseData();

```

To execute this, I had to give Node.js a little bit more ram to run this. 

```
node --max_old_space_size=8192 -r ts-node/register scripts/uuid-migration/create-files.ts
```

At the end of this, I had 40 tables with all of my existing data in json files.

### Step 3: Drop the local production database 

We drop the local production database and create a fresh new schema.

```sql
drop schema app_database
create schema app_database
```

### Step 4: Change all of the Sequelize models to use UUIDs

Normally, in our Sequelize projects, we'll have all of our models in a `/models` folder. This step meant to go into each model and update each primary key and foreign key relationship to use UUIDs. 

```diff
  user_id: {
-   type: DataTypes.INTEGER(11),
+   type: DataTypes.UUID,
-   autoIncrement: true,
+   defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
```

Sequelize allows you to choose between using UUIDV4 or UUIDV1 for the default value. It also allows you to supply [your own UUID generation function](http://docs.sequelizejs.com/variable/index.html).

### Step 5: Update the initial migration & any seeder files

Not only should we update the models, but we should also update the initial migration file with changing 

```diff
  user_id: {
-   type: Sequelize.INTEGER(11),
+   type: Sequelize.UUID,
-   autoIncrement: true,
+   defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
```

We do pretty much the same thing as step 4 but in our initial migration file instead. There's also a tiny bit of a difference because we have access to `Sequelize` but not `DataTypes` here.

### Step 6: Run the migration

After we've updated the migrations and we've updated the models, it's time to run the sequelize migration in addition to any seeder files.

```
npx sequelize db:migrate --env production && npx sequelize db:seed:all --env production
```


### Step 7: Identify the order of table creation

In order for us to insert all of the existing data that we have saved in JSON files, we need to know **which order to insert data** as to not refer to tables that don't yet exist.

Looking at the history of tables being created through my migration files, I could figure out the order.

```javascript
const modelOrder = [
  'User', // first table ever created
  'Product',
  // ...
  // ... more tables
  // last table
]
```

This took me a little while to do, but after I had them all saved in an array, I could move to the final step.

### Step 8: Import the data

The last part is actually importing the data.

The general pseudocode of the script was:

```
Loop through each of the tables in the order created
  for each table 
    get the data file
    for each row in the data file
      prepareRowWithUUIDs(row attributes, row data)

In prepareRowWithUUIDs(row attributes, row data)
  for each attribute in row attributes
    if the type is UUID
      use the old auto-incremented row data to hash it into a new UUID
  
  return row data
```

Here's the final script.

```typescript
import * as fs from 'fs'
import * as path from 'path'
import models from '../../src/infra/models'
import { get } from 'lodash'
const createUUID = require('uuid-by-string')

const modelOrder = [
  'User', // first table ever created
  'Product',
  // ...
  // ... more tables
  // last table
]

const OpenDataFile = (fileName) => {
  return JSON.parse(fs.readFileSync(path.join(__dirname, `out/${fileName}.json`), 'utf8'));
}

class MigrateToUUID {
  private models: any;

  constructor () {
    this.init();
  }

  async init () {
    const models = await getModels();
    this.models = models;

    for (let modelName of modelOrder) {
      const model = this.models[modelName];
      const data = OpenDataFile(modelName);
      console.log(`Inserting data into ${modelName}...`)
      await this.insertDataToTable(model, data, modelName);
    }

    process.exit(1);
  }

  prepareRowWithUUIDs (rowAttributes: Object, rowData: Object): any {
    for (let [i, attrName] of Object.keys(rowAttributes).entries()) {
      const attr = rowAttributes[attrName];
      
      if (get(attr, 'type.key') === "UUID") {
        const oldId = rowData[attrName];
        const newUUID = createUUID(String(oldId));
        rowData[attrName] = newUUID;
      }
    }

    return rowData;
  }

  async insertDataToTable (modelInstance: any, data: any[], modelName: string) {
    for(let row of data) {
      row = this.prepareRowWithUUIDs(modelInstance.attributes, row);
      try {
        await modelInstance.create(row);
      } catch(err) {
        console.log(`Error occured in model => ${modelName}`);
        console.log(err);
      }
    }
  }
}

new MigrateToUUID();
```

***

Finally, at that point- all I had to do was make sure everything still worked and swap out the old production database for the new one utilizing UUIDs.

Overall, this process _was_ pretty painful.

If anyone knew of a better way with better tooling to accomplish something like this, drop a comment so the next person doesn't have to go through the same kind of hell.

## Discussion about UUID Performance

I was curious about the performance of UUIDs compared to ints and whether I should bother with worrying about the performance tradeoffs right now. 

After a good 10 minutes browsing the web and seeing a mixed amount of engineers speak **negatively** about using UUIDs and another half speaking positively about it, I figured I'd open my own Twitter thread.

I was delighted that some really smart domain-modelers, including [Vaughn Vernon]("[Implementing Domain-Driven Design](https://www.amazon.ca/gp/product/0321834577?ie=UTF8&tag=stemmlerjs09-20&camp=15121&linkCode=xm2&creativeASIN=0321834577)") himself, could share their experiences.

__My original Twitter thread.__

https://twitter.com/stemmlerjs/status/1120128503012298752

https://twitter.com/chadcthomas/status/1120278809562025985

https://twitter.com/VaughnVernon/status/1120217446084800513

https://twitter.com/egilhansen/status/1120222244687495170

https://twitter.com/ahmedchicktay/status/1120217190597320706


The comment that really eased me on this was:

https://twitter.com/bharam5/status/1120158050894131200

This was the whole reason why I wanted to use UUIDs, so that I didn't have to rely on a round-trip to the DB and so that I'd actually be able to dispatch Domain Events[^3]: containing the entity id as part of the payload.

For my needs, and I'd wager for most people's needs getting started- defer unnecessary optimization.

Based on discussion, a smart thing to do **when necessary** would be to compact the UUIDs or implement some caching (I like this suggestion, it seems like a really good use case for caching).

**_Further reading on UUID performance and optimization._**

[Storing UUIDs in an Optimized way](https://www.percona.com/blog/2014/12/19/store-uuid-optimized-way/)

[Storing UUID Values in MySQL Tables](https://mysqlserverteam.com/storing-uuid-values-in-mysql-tables/)

[MySQL/InnoDB - Clustering Index with UUID](https://dba.stackexchange.com/questions/100468/mysql-innodb-clustering-index-with-uuid)

[MySQL UUID Smackdown: UUID vs. INT for Primary Key](http://www.mysqltutorial.org/mysql-uuid/)

### Sequelize ORM

I use the Sequelize ORM for most of my Node/TypeScript projects so I was curious about the type of support available for these optimizations. 

It looks like there's an [open PR](https://github.com/sequelize/sequelize/issues/9271) in the Sequelize repo to support binary(16) UUIDs. 

This would help compact the UUID from a char(36) down so that it takes up less space.


[^1]: The Domain Layer is the center of our Layered Architecture. It has 0 dependencies to anything other that what belongs in the domain. This layer is encapsulated and doesn't know anything about web servers, http, rest, databases, caching, and any other infrastructre or frameworks.

[^2]: I probably have the world record for the most amount of un-answered questions on Stack Overflow.

[^3]: Domain Events are an excellent way to execute post-entity creation tasks like, after adding an item to a Schedule in a Scheduling application, sending an email to the affected parties. It allows the application service that sends emails to be de-coupled from the Schedule domain entity (Schedule shouldn't need to know anything about emailing), yet still execute some code in response to a relevant domain event.