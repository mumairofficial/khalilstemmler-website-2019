---
templateKey: blog-post
title: "Value Objects - DDD w/ TypeScript"
date: '2019-04-07T10:04:10-05:00'
updated: '2019-04-12T10:04:10-05:00'
description: >-
  Value Objects are one of the primary components of Domain-Driven Design. Here's a simple Value Object class in TypeScript.
tags:
  - DDD
  - TypeScript
  - Software Design
  - Value Object
category: Domain-Driven Design
image: /img/blog/ddd-value-object/value-objects.png
published: true
---

In Domain-Driven Design, Value Objects are one of the two primitive concepts that help us to create rich and encapsulated domain models. 

The two concepts are **Entities** and **Value Objects**.

_Value Objects_ are best understood by understanding how it's different from an Entity. Their main difference is in how we determine **identity** between two Value Objects and how we determine **identity** between two Entities.

### Entity Identity

We use an Entity to model a domain concept when we care about the model's __identity__ and being able to distinguish that identity from other instances of the model. 

The _way that we determine that identity_ helps us determine whether it's an Entity or a Value Object.

A common example is modeling a user. 

In this example, we'd say that a `User` is an Entity because the way that we determine the difference between two different instances of a `User` is through it's **Unique Identifier**.

The **Unique Identifier** we use here is either a randomly-generated UUID or an auto-incremented SQL id that becomes a Primary Key that we can use for lookup from some persistence technology.

--- 

### Value Objects

With Value Objects, we establish identity through the **structural equality** of two instances.

#### Structural Equality

Structural equality means that two objects have the same content. This is different from **referential equality / identity** which means that the two objects _are the same_.

To identify two Value Objects from each other, we look at the actual contents of the objects and compare based on that.

For example, there might be a `Name` property on the `User` Entity.

How can we tell if two `Name`s are the same?

It's pretty much like comparing two strings, right?

```javascript
"Nick Cave" === "Nick Cave" // true

"Kim Gordon" === "Nick Cave" // false
```

This is easy. 

Our `User` could look like this: 

```typescript

interface IUser {
  readonly name: string
}

class User extends Entity<IUser> {
  public readonly name: string;

  constructor (props: IUser) {
    super(props);
    this.name = props.name;
  }
}
```

This is OK, but it could be better. Lemme ask a question:

> What if we wanted to limit the length of a user's name. Let's say that it can be no longer than 100 characters, and it must be at least 2 characters.

A naive approach would be to write some validation logic before we create an instance of this User, maybe in a service.

```typescript
class CreateUserService {
  public static createUser (name: string) : User{
    if (name === undefined || name === null || name.length <= 2 || name.length > 100) {
      throw new Error('User must be greater than 2 chars and less than 100.')
    } else {
      return new User(name)
    }
  }
}
```

This isn't ideal. What if we wanted to handle Editing a user's name?

```typescript
class EditUserService {
  public static editUserName (user: User, name: string) : void {
    if (name === undefined || name === null || name.length <= 2 || name.length > 100) {
      throw new Error('User must be greater than 2 chars and less than 100.')
    } else {
      user.name = name;
      // save
    }
  }
}
```

1. This isn't really the right place to be doing this.
2. We've just repeated the same validation logic.

This is actually how a lot of projects start to spin out of scope. We end up putting too much domain logic and validation into the services, and the models themselves don't accurately encapsulate the domain logic.

We call this an [Anemic Domain Model](/wiki/anemic-domain-model).

We introduce value object classes to encapsulate where validation should occur and to satisfy the **invariants** (validation & domain rules) of our models.

### Value Objects

We had this before, a basic class for our `User` entity.

```typescript
interface IUser {
  readonly name: string
}

class User extends Entity<IUser> {
  public readonly name: string;

  constructor (props: IUser) {
    super(props);
    this.name = props.name;
  }
}
```

If we were to create a class for the `name` property, we could co-locate all of the validation logic for a `name` in that class itself. 

We will also make the `constuctor` private, and using a `static factory method` to execute the preconditions that must be satisfied in order to create a valid `name` using the `constructor`.

```typescript
interface IName {
  value: string
}

class Name extends ValueObject<IName> {
  private constuctor (props: IName) {
    super(props);
  }

  public static create (name: string) : Name {
    if (name === undefined || name === null || name.length <= 2 || name.length > 100) {
      throw new Error('User must be greater than 2 chars and less than 100.')
    } else {
      return new User({ value: name })
    }
  }
}

```

And then change the `User` class to require a `IName` instead of a string. 

We'll also utilize a `static factory method` here as well.

```typescript
interface IUser {
  readonly name: Name;
}

class User extends Entity<IUser> {
  public readonly name: Name;

  private constructor (props: IUser) {
    super(props);
    this.name = props.name;
  }

  public static create (props: IUser) {
    if (props.name === null || props.name === undefined) {
      throw new Error('Must provide a name for the user');
    } else {
      return new User(props);
    }
  }
}
```

## Value Object class

Here's an example of a Value Object class.

```typescript

import { shallowEqual } from "shallow-equal-object";

interface ValueObjectProps {
  [index: string]: any;
}

/**
 * @desc ValueObjects are objects that we determine their
 * equality through their structrual property.
 */

export abstract class ValueObject<T extends ValueObjectProps> {
  public readonly props: T;

  constructor (props: T) {
    this.props = Object.freeze(props);
  }

  public equals (vo?: ValueObject<T>) : boolean {
    if (vo === null || vo === undefined) {
      return false;
    }
    if (vo.props === undefined) {
      return false;
    }
    return shallowEqual(this.props, vo.props)
  }
}
```

Check out the `equals` method. Notice that we use `shallowEquals` in order to determine equality. This is one way to accomplish `structural equality`.

When it makes sense, subclasses of this **Value Object** base class can also be extended to include convenience methods like `greaterThan(vo?: ValueObject<T>)` or `lessThan(vo?: ValueObject<T>)`. It wouldn't make sense in this example, but it might if we were talking about something like `LoggingLevel`s or `BusinessRating`s.

***

In future articles, we'll talk about:

- entity design
- better error handling technique for object creation
- moving anemic code out of services and into domain models
- writing DTOs to create data contracts


This is part of the Domain-Driven Design with TypeScript series. If this was useful to you, let me know in the comments & subscribe to the newsletter to get notified when new articles come out. Cheers!





