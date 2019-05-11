---
templateKey: blog-post
title: "Clean & Consistent Express.js Controllers | Enterprise Node.js + TypeScript"
date: '2019-05-11T10:04:10-05:00'
updated: '2019-05-11T10:04:10-05:00'
description: >-
  In this article, we explore how to structure a clean and consistent Express.js controller by using abstraction and encapsulation with TypeScript.
tags:
  - Node.js
  - TypeScript
  - Express.js
  - Enterprise software
category: Enterprise Node + TypeScript
image: /img/blog/enterprise-node/enterprise-node.png
published: true
---

_This article is part of the **Enterprise Node.js + TypeScript** series_.

[Express.js](https://expressjs.com/) is my favourite web framework to use with Node.js for building out the **RESTful APIs** on my backend applications.

One of the reasons why Express.js is so popular is because it's minimal and allows you to get up and running quickly with pretty much 0 boilerplate code.

Because there's a lack of opinion around how Express.js controllers and routes should be setup, it's easy to end up writing code that's not very DRY and not very consistent. 

Not only is it important to keep our code DRY to prevent introducing bugs, but we should aim to keep our API responses consistent. The best developer experiences working with RESTful APIs (think [Stripe's API](https://stripe.com/docs)) original from clear and consistent RESTful responses.

Right off the bat, I can think of two ways that we can increase the stability/structure of our responses:

1. Use **Data Transmission Objects** (DTOs) to compose a contract for the structure of the response objects (consistent data contracts).
2. Use a BaseController to encapsulate all responses for all concrete controllers.

We'll cover #2 in this article and revisit #1 in a separate one.

## Creating a BaseController

We want to create some sort of `BaseController` that represents all of the functionality that a controller can accomplish, from one place.

For example, every controller should be able to:

- take in a request and a response
- return a 200 with a response payload / dto
- return a 200/201 without a response payload / dto
- return a 400 error
- return a 500 error

To encapsulate all of this functionality, we can use an `abstract` class.

```typescript
import * as express from 'express'

export abstract class BaseController {
  abstract execute (req: express.Request, res: express.Response): void;

  public static jsonResponse (res: express.Response, code: number, message: string) {
    return res.status(code).json({ message })
  }

  public ok<T> (res: express.Response, dto?: T) {
    if (!!dto) {
      return res.status(200).json(dto);
    } else {
      return res.sendStatus(200);
    }
  }

  public created (res: express.Response) {
    return res.sendStatus(201);
  }

  public clientError (res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, 400, message ? message : 'Unauthorized');
  }

  public unauthorized (res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, 401, message ? message : 'Unauthorized');
  }

  public paymentRequired (res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, 402, message ? message : 'Payment required');
  }

  public forbidden (res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, 403, message ? message : 'Forbidden');
  }

  public notFound (res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, 404, message ? message : 'Not found');
  }

  public conflict (res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, 409, message ? message : 'Conflict');
  }

  public tooMany (res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, 429, message ? message : 'Too many requests');
  }

  public fail (res: express.Response, error: Error | string) {
    return res.status(500).json({
      message: error.toString()
    })
  }
}
```

## Implementing a controller

Let's take the basic example of creating a `User` that requires a valid `password`, `username` and `email`.

Starting a simple controller to create a user might begin looking like this.

```typescript
class CreateUserController extends BaseController {
  public execute (req: express.Request, res: express.Response): void {
    try {
      // ... Handle request by creating objects
 
    } catch (err) {
      return this.fail(res, err.toString())
    }
  }
}
```

Also, check out that **nice auto-completion** and all the methods we now have available that we no longer have to manually implement!

![](/img/blog/compared/methods.png)

### Implementing the abstract method

When we **extend** an `abstract` class, if the abstract class had any _abstract methods_ on it, we would need to implement those in the subclass. 

<a href="/resources/solid-nodejs-architecture">
  <img src="/img/resources/solid-book/insert-2.png"/>
</a>

Observe that we've implemented it in this `CreateUserController`. If you'll recall in the `BaseController`, it had a single `abstract method`:

```typescript
// Abstract method from the CreateUserController 
abstract execute (req: express.Request, res: express.Response): void;
```

Let's continue with implementing the controller.

### Validating the request payload

Let's continue by utilizing the [Value Objects](/articles/typescript-value-object/) to validate that the `username`, `password` and `email` coming in hot off the wire from the internet are valid.

```typescript
class CreateUserController extends BaseController {
  public execute (req: express.Request, res: express.Response): void {
    try {
      const { username, password, email } = req.body;
      const usernameOrError: Result<Username> = Username.create(username);
      const passwordOrError: Result<Password> = Password.create(password);
      const emailOrError: Result<Email> = Email.create(email);

      const result = Result.combine([ 
        usernameOrError, passwordOrError, emailOrError 
      ]);

      if (result.isFailure) {
        // Send back a 400 client error
        return this.clientError(res, result.error);
      }

      // ... continue

    } catch (err) {
      return this.fail(res, err.toString())
    }
  }
}
```

If you've been following with the [Domain Driven-Design](/articles/domain-driven-design-intro/) articles I've been writing, you'll recall that this is my preferred approach of delegating the responsibility of validating objects. 

From within any of these Value Object classes, you can use a combination of [Joi validators](https://github.com/hapijs/joi), custom validation methods and anything else you like in order to ensure that the value object [invariants](/wiki/invariant/) are satisfied.

However you might be seeing something _new_ here.

#### Result class

And that _something_ is the usage of a **Result** class. Stay tuned for an upcoming article on that.

For now, it's sufficient to understand that the **Result** class is a cleaner way to handle errors rather than throwing errors explicitly. It also allows us to `combine(Result[]?)`s together in order and will return the first of the provided array of Results that is invalid.

This in turn helps to pass back **really helpful contextual error messages** to the client consuming this API.

---

### Finishing it up

In order to finish off this API request, we'll want to persist the `User` to persistence. 

To do that, we'll ensure that we utilize [Depdendency Inversion](/wiki/dependency-inversion/) to specify that this class depends on an `IUserRepo`.

```typescript
class CreateUserController extends BaseController {
  private userRepo: IUserRepo;

  constructor (userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public execute (req: express.Request, res: express.Response): void {
    try {
      const { username, password, email } = req.body;
      const usernameOrError: Result<Username> = Username.create(username);
      const passwordOrError: Result<Password> = Password.create(password);
      const emailOrError: Result<Email> = Email.create(email);

      const result = Result.combine([ 
        usernameOrError, passwordOrError, emailOrError 
      ]);

      if (result.isFailure) {
        // Send back a 400 client error
        return this.clientError(res, result.error);
      }

      // ... continue
      const userOrError: Result<User> = User.create({
        username: usernameOrError.getValue(),
        password: passwordOrError.getValue(),
        email: emailOrError.getValue()
      });

      if (userOrError.isFailure) {
        // Send back a 400 client error
        return this.clientError(res, result.error);
      }

      const user: User = userOrError.getValue();

      // Create the user
      await this.userRepo.createUser(user);

      // Return a 200
      return this.ok<any>(res);

    } catch (err) {
      return this.fail(res, err.toString())
    }
  }
}
```

That's it! 

---

Now you know my preferred way to create Express.js controllers by encapsulating all of the common functionality in an abstract class.

This type of thing is also possible to do without TypeScript but it's requires a little bit more trickery in order to implement the design patterns and principles we've mentioned in this article.

If you're still considering whether you want to use TypeScript, check out [my definitive guide](/articles/when-to-use-typescript-guide/) on whether it makes sense for your next project.