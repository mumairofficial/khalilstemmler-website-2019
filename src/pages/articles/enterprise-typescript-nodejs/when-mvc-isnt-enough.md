---
templateKey: blog-post
title: "When MVC Doesn't Cut it Anymore"
date: '2019-05-24T10:04:10-05:00'
updated: '2019-05-24T10:04:10-05:00'
description: >-
  MVC the grandaddy of web application architectures. In this article, we examine when it's time to look into other patterns.
tags:
  - Node.js
  - TypeScript
  - Architecture
  - Enterprise software
category: Enterprise Node + TypeScript
image: /img/blog/enterprise-node/enterprise-node.png
published: false
---

Do you remember what MVC is?

MVC is the grandaddy of all web based architectures.

## View
The view is what we end up seeing on our computers and our applications.

## Models

The models are objects that exist to mimic real life entities that exist in the real world, like User or Job.

In CRUD apps utilizing ORMs (like Sequelize or MongoDB), the models 
really aren’t much more than simple files that contain the attributes of a particular model, and how it’s shaped in a database.

## Controller

The controller is an artifact that sits there waiting for requests, takes the request in, pulls in the related or important models that it needs to interact with in order to satisfy the request, and then generates some sort of response to the outside world.

Today, we usually interfact with MVC architectures using CRUD.

## CRUD 
CRUD stands for Create, Read, Update, Delete.

It’s used to pretty much to perform those methods on the `Model`s.

A **RESTful API** call can be reasoned to be: 

>  the combination of a route (which defines which model it is going to interact with), and a method (defining how it is going to interact with it).

```bash
GET /users
DELETE /user/:userId
POST /user/new
```

Our controllers are the ones that are usually responsible for perfoming the action that we want to occur, handling the request that comes in.

The controller interacts with a particular model (or set of models) and does the particular type of interaction (CRUD).

### Features / use-cases cut verifically

(more about that in a sec)

---

Note that there are a bunch more different types of HTTP methods that have been defined to different kinds of things. 

`PATCH` (kind of like POST, but not really) HEAD, etc

## ORMs

In CRUD apps, the ORMs enable you to carry out all of those CRUD operations.

They enable you to create in-memory instances of those database rows so that you can create, retrieve, update, and delete them from your persistence technology (SQL, noSQL _usually_).

***Calls that aren’t really CRUD-y***

So in Univjobs, we have a way to verify a job posting. 

After employers post a job, we have to make a change to approve the job posting.

What kind of HTTP method should that be? (look into API design here).

It’s not really `CREATE` because we’ve already created the job.

It’s not really a `READ` either. 

It’s more of an `UPDATE` to the status of a job, so let’s use that (weak argument btw).

We might do something like:

```bash
POST /job/:jobId/verify
```

Or if we’re following the convention,

```bash
PATCH (since it’s more update-y) 
/job/:jobId/verify/ ???
```

The EXACT moment I realized that MVC wasn’t enough is something that I should probably picture frame. 

It’s an exact moment that I would picture frame because it tells a story of complexity that was about to smack me in the face repeatedly and cause additonal hurdles in the coming future.

The moment was when I defined a method in a service class called `postJobCreatedHooks`.

Let's say it looked like this,

```typescript
function postJobCreatedHooks (jobId: string) {
  // Charge the customer.
  // Add the job to our queue of new jobs for the week.
  // Trigger a gatsby build to rebuild our Gatsbyjs site.
  // Post the job to social.
  // Update the visibility of the job so that only the targeted audience that is allowed to see the job could see the job.
  // Send an email to the customer letting them know their job is active.
}
```

Here’s what happens after I verify a job.

1. We verify the job, setting it’s status to verified.
2. We charge the customer.
3. We add the job to our queue of new jobs for the week.
4. We trigger a gatsby build to rebuild our Gatsbyjs site.
5. We post the job to social.
6. We update the visibility of the job so that only the targeted audience that is allowed to see the job could see the job.
7. We send an email to the customer letting them know their job is active.


We did all of that in a single method invocation. 

Holy. Shit. 

The thing is, a lot of these ORMs actually have mechanisms built in to execute code after things get saved to the database.

For example, the [Sequelize docs](http://docs.sequelizejs.com/manual/hooks.html) has hooks for each of these lifecycle events.

```
(1)
  beforeBulkCreate(instances, options)
  beforeBulkDestroy(options)
  beforeBulkUpdate(options)
(2)
  beforeValidate(instance, options)
(-)
  validate
(3)
  afterValidate(instance, options)
  - or -
  validationFailed(instance, options, error)
(4)
  beforeCreate(instance, options)
  beforeDestroy(instance, options)
  beforeUpdate(instance, options)
  beforeSave(instance, options)
  beforeUpsert(values, options)
(-)
  create
  destroy
  update
(5)
  afterCreate(instance, options)
  afterDestroy(instance, options)
  afterUpdate(instance, options)
  afterSave(instance, options)
  afterUpsert(created, options)
(6)
  afterBulkCreate(instances, options)
  afterBulkDestroy(options)
  afterBulkUpdate(options)
```

In order to hook one of these up, you'd hook it up to your ORM model definition file.

Like this for example:

```typescript
class User extends Model {}
User.init({
  username: DataTypes.STRING,
  mood: {
    type: DataTypes.ENUM,
    values: ['happy', 'sad', 'neutral']
  }
}, {
  hooks: {
    afterSave: (user, options) => {
      user.mood = 'happy';
    }
  },
  sequelize
});
```

Surely, it wouldn't be a good idea to pollute our `Model` with service calls in order to do all this stuff. 

```typescript
hooks: {
  afterSave: (user, options) => {
    if (user.status === 'verified' && options.status !== 'verified') {
      // Charge the customer.
      // Add the job to our queue of new jobs for the week.
      // Trigger a gatsby build to rebuild our Gatsbyjs site.
      // Post the job to social.
      // Update the visibility of the job so that only the targeted audience that is allowed to see the job could see the job.
      // Send an email to the customer letting them know their job is active.
    }
  }
}
```

Doing something like that goes against the very essence of the **clean architecture**. It also makes this code a whole lot harder to test. 

Over the course of a few months, we just kept identifying more and more things that needed to happen after we verified a job.

```typescript
function postJobCreatedHooks (jobId: string) {
  // Charge the customer.
  // Add the job to our queue of new jobs for the week.
  // Trigger a gatsby build to rebuild our Gatsbyjs site.
  // Post the job to social.
  // Update the visibility of the job so that only the targeted audience that is allowed to see the job could see the job.
  // Send an email to the customer letting them know their job is active.

  // and more... 
  // and more......
}
```

In the architecture world, we call this way of coding a big ol’ nasty **Transaction Script**.

Transaction Scripts are incredibly common in MVC architecture.

Transation Scripts can lead to incredibly brittle production code. 

Transaction Scripts are also a lot harder to test.

Transaction Scripts are also a huge sign that the model part of your code is an Anemic Domain Model. (link to anemic domain models).

That has a really mean and nasty kind of sounding name, but it’s actually not always a bad thing.  Generally speaking, MVC and writing this type of code is really really good for when you’re working on non-complex applications that don’t start to step beyond basic CRUD.  However, the moment that you start trying to fit unnatural API calls and other batches of code to get run in reaction to one other type of event, it’s time to start looking into other potential architectures.  Notice I said the word, “Event”.  In **Domain-Driven Design**, one of the most redeeming things about it is the existence of what are called “Domain Events”  **Domain Events**  Domain Events signify that something significant to your domain has just occurred.  It’s something that’s interesting and that might signify that other events need to occur in reaction to it.  That’s not always the case, but it’s something that is particuralty intresting to your domain.  Let’s see if we can improve the architecture of what happens when we post a job using  Domain Events.         