---
templateKey: article
title: "Flexible Error Handling w/ the Result Class | Enterprise Node.js + TypeScript"
date: '2019-05-15T10:04:10-05:00'
updated: '2019-05-15T10:04:10-05:00'
description: >-
  Purposefully throwing errors can have several negative side effects to the readability and traceability of your code. In this article, we take a look at an alternative to how to handle errors within your Node.js + TypeScript applications.
tags:
  - Node.js
  - TypeScript
  - Express.js
  - Enterprise software
category: Enterprise Node + TypeScript
image: /img/blog/enterprise-node/enterprise-node.png
published: true
---

_This article is part of the **[Enterprise Node.js + TypeScript](/articles/categories/enterprise-node-type-script/)** series_.

> Do you ever find yourself wondering where exactly you should throw an error to be consumed by a try-catch? Do you sometimes end up having multiple layers of try-catch blocks? Should you just return null instead?

If you answered no, I'd be _surprised_. As a once new developer turned Junior Java Developer turned Node.js Developer turned TypeScript fanatic, I've been there hundreds of times.

Consider the creation of a `User` object. We need to pass in several arguments that need to be validated in order to create one.

```typescript
class User {
  public email: string;
  public firstName: string;
  public lastName: string;

  private constructor (email: string, firstName: string, lastName: string): User {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  public static createUser (email: string, firstName: string, lastName: string): User {
    if (!isValidEmail(email)) {
      throw new Error("Email is invalid")
    }

    // .. validate firstName

    // .. validate lastName

    // return new user
  }
}
```

This is a pretty common situation to be in. At this point, we might consider to ourselves, "does it make sense to catch that error from within this class?". 

No, that doesn't make sense. What good is it to catch the creation error from within the `User` class? It's entire purpose is be used by something else. And even still, what would we do? Return `null`? That's not a good idea. The calling code is expecting to get a `User` back from this method. 

Ok, so that means that **any class's** methods that create `User`s need to ensure that they wrap the creation of an `User` with a `try-catch` block.

*I don't think that's a good way to go about things for an operation so trivial*.

## Why throwing errors purposefully might not always be the best option

Notice how careful I am about saying _"might not always be the best option"_. That's because sometimes it is a good option. 

But if something like **creating new objects** is this dangerous, it will impose constraints on the calling code. That's a **code smell** if I ever smelt one.

Another reason why we don’t want to do this is because using the `throw` keyword isn't very type-safe. 

I know he [doesn't have great press these days](https://www.wired.co.uk/article/the-sonic-live-action-trailer-is-bad), but I like to equate it to [Sonic](https://en.wikipedia.org/wiki/Sonic_the_Hedgehog) running through loops, picking up momentum, then stepping on something spiky, causing him to lose all his momentum and rings.

When we use the `throw` keyword, we're breaking the flow of our code and jumping up to the nearest Error handler (if it exists, and it better exist or else we'll get an uncaughtException error).

This kind of _jumpy_ behaviour draws similarities to the [sometimes criticized](https://stackoverflow.com/questions/3329390/difference-between-goto-and-throw) `GOTO` statement.

There are several arguments for and against that kind of behavior, but for our needs, we want **predictable** and **type safe** program behavior. That's one of the primary reasons why so many of us were drawn to TypeScript in the first place.

Yes, you could *remember* to put `try-catch` blocks all over the place and _predict_ what's going to happen, but again- the compiler isn't helping you at all on that. That's all on you.

## Introducing the Result class

I first discovered the Result class while learning about [Anemic Domain Models](/wiki/anemic-domain-model/) in a pluralsight course by Vladimir Khorikov.

This is his C# Result class, converted to TypeScript.

```typescript
export class Result<T> {
  public isSuccess: boolean;
  public isFailure: boolean
  public error: string;
  private _value: T;

  private constructor (isSuccess: boolean, error?: string, value?: T) {
    if (isSuccess && error) {
      throw new Error(`InvalidOperation: A result cannot be 
        successful and contain an error`);
    }
    if (!isSuccess && !error) {
      throw new Error(`InvalidOperation: A failing result 
        needs to contain an error message`);
    }

    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this.error = error;
    this._value = value;
    
    Object.freeze(this);
  }

  public getValue () : T {
    if (!this.isSuccess) {
      throw new Error(`Cant retrieve the value from a failed result.`)
    } 

    return this._value;
  }

  public static ok<U> (value?: U) : Result<U> {
    return new Result<U>(true, null, value);
  }

  public static fail<U> (error: string): Result<U> {
    return new Result<U>(false, error);
  }

  public static combine (results: Result<any>[]) : Result<any> {
    for (let result of results) {
      if (result.isFailure) return result;
    }
    return Result.ok<any>();
  }
}
```

There's many benefits to using this class. It allows us to:

- safely return error states
- return valid results
- combine several results and determine the overall success or failure states

With a new `Result<T>` instance, we can:
- check for validity with `isSuccess` 
- check for failure using the `isFailure`
- collect the error with `error`
- collect the value with `getValue()`
- check for the validity of an array of `Result`s using `Result.combine(results: Result[])`

### Using the Result class

Let's adjust the `User` class, returning a `Result<User>` from the static `createUser()` **Factory method** instead of throwing an error explicitly.

```typescript
class User {
  public email: string;
  public firstName: string;
  public lastName: string;

  private constructor (email: string, firstName: string, lastName: string): User {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  public static createUser (email: string, firstName: string, lastName: string): Result<User> {
    if (!isValidEmail(email)) {
      return Result.fail<User>('Email is invalid')
    }

    if (!!firstName === false && firstName.length > 1 && firstName.length < 50) {
      return Result.fail<User>('First name is invalid')
    }

    if (!!lastName === false && lastName.length > 1 && lastName.length < 50) {
      return Result.fail<User>('Last name is invalid')
    }

    return Result.ok<User>(new User(email, firstName, lastName));
  }
}
```

_Note: Another potential refactoring would be to locate the validation rules in [Value Objects](/articles/typescript-value-object/) for `email`, `firstName` and `lastName`._

And then let's actually create a `User` from a parent class.

```typescript
class CreateUserController {
  public executeImpl (): void {
    const { req } = this;
    const { email, firstName, lastName } = req.body;
    const userOrError: Result<User> = User.create(email, firstName, lastName);

    if (userOrError.isFailure) {
      return this.fail(userOrError.error)
    }

    const user: User = userOrError.getValue();

    // persist to database ...
    
  }
}
```

Voila!

And if we were using [Value Objects](/articles/typescript-value-object/), we could use the `Result.combine()` method to validate an array of `Result`s all at once like this..

```typescript
class CreateUserController {
  public executeImpl (): void {
    const { req } = this;
    const { email, firstName, lastName } = req.body;
    const emailOrError: Result<Email> = Email.create(email);
    const firstNameOrError: Result<FirstName> = FirstName.create(firstName);
    const lastNameOrError: Result<LastName> = LastName.create(lastName);

    const userPropsResult: Result<any> = Result.combine([ 
      emailOrError, firstNameOrError, lastNameOrError
    ])

    // If this failed, it will return the first error that occurred.
    if (userPropsResult.isFailure) {
      return this.fail(userPropsResult.error)
    }

    const userOrError: Result<User> = User.create(
      emailOrError.getValue(), 
      firstNameOrError.getValue(), 
      lastNameOrError.getValue()
    );

    if (userOrError.isFailure) {
      return this.fail(userOrError.error)
    }

    const user: User = userOrError.getValue();

    // persist to database ...
  }
}
```

That's it! That's how we can use a `Result` class to allow the compiler to help us deal with expected edge cases errors.

---

There are some cases where throwing errors purposefully does make a lot of sense though!

## When to throw errors purposefully

> A: When you're working on a library or a tool to be used by other developers. 

In this case, you don't want to force them into catching errors using our preferred `Result` class or any other non-standard approach. We should leave that up to them.

Although, in the JavaScript world, a common convention is to return errors as the _first parameter_ to a callback. 

### Example: Wrapping callback errors as rejected Promises

The developers who implemented the [Redis](https://www.npmjs.com/package/redis) npm package decided that they wanted to report back errors using the callback approach.

```typescript
client.get(key,
  (error: Error, reply: unknown) => {
    if (error) {
      // handle error
    } else {
      // handle reply
    }
});
```

In my actual application code consuming this library, I'll usually wrap these in a `Promise`s to be used by the rest of my code with async/await.

```typescript
import { RedisClient } from 'redis'

export abstract class AbstractRedisClient {
  protected client: RedisClient;

  constructor (client: RedisClient) {
    this.client = client;
  }

  public getOne<T> (key: string): Promise<T> {
    return new Promise((resolve, reject) => {
      this.client.get(key,
         (error: Error, reply: unknown) => {
          if (error) {
            return reject(error)
          } else {
            return resolve(<T>reply);
          }
      });
    })
  }
}
```

When you're dealing with APIs, external resources or other adapters to the outside world, it's a pretty common thing to need to create your own **Adapter** for using it so that you can safely refer to it from within your own codebase using your **own code style**.

But, it wouldn't be clean to need to create an **Adapter** for each class (like the `User` class) in order to safely wrap them... so we needed something else.

> B: When we encounter errors that we don't expect or know how to deal with. 

Kind of an extension to `A` because when we're working on library code, we **don't really know** how people using our code in the future will plan to handle errors, we **just need them to know that they're happening**.

For errors that we **don't know how to deal with**, usually, we would like to cancel the operation that was taking place because something bad happened. 

These are errors that really mess up what we were trying to do and can be caused by an infinite possibility of things that we didn't expect or assume would happen:

- database connectivity issues
- code typos
- null pointer errors (sometimes)
- out of memory

If it's an <u>http request</u>, we might throw back a `500` error to the client.

If it's a <u>script</u>, we might exit with a non-zero error code.

Or, yes use a `throw` statement, but only when you're writing code to be used by someone else that you have no idea how they intend to use it.

In this case, it truly makes sense for us to kill whatever it was we were doing and just exit or cancel the web request.

## Conclusion

Some developers can get really really fancy with this. I personally haven't done too much research on the topic myself, but it stems from [monads](https://en.wikipedia.org/wiki/Monad_(functional_programming)) and the like and you can get some really funky rxjs-y like results if you took this to the extreme.

I don't think that way of programming is mainstream enough for me to want to advocate it to my peers too intently just yet, as even Rx.js can sometimes be a challenge. Perhaps at some point I'll find time to learn more.

## Additional reading

Here are some more really good resources on this topic if you'd like to go deeper.

[Functional C#: Handling failures, input errors](https://enterprisecraftsmanship.com/2015/03/20/functional-c-handling-failures-input-errors/)

[Handling Errors and Exceptions in C#. Part 3](https://www.engineerspock.com/2016/10/24/handling-error-and-exceptions-part-3/)

[Type Safe Error Handling in TypeScript](https://dev.to/\_gdelgado/type-safe-error-handling-in-typescript-1p4n)