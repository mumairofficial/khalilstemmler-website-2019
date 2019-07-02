---
templateKey: article
title: Cleanly Catching Errors in Node.js w/ TypeScript
date: '2019-05-08T10:04:10-05:00'
updated: '2019-05-08T10:04:10-05:00'
description: >-
  Do you ever find yourself wondering where exactly you should throw an error to be consumed by a try-catch? Should I throw it within the controller? 
tags:
  - Node.js
  - Software Design
  - TypeScript
category: Web Development
image: /img/blog/cleaner-errors/errors.jpeg
published: false
---
https://enterprisecraftsmanship.com/2015/03/20/functional-c-handling-failures-input-errors/

https://www.engineerspock.com/2016/10/24/handling-error-and-exceptions-part-3/

https://medium.freecodecamp.org/using-events-in-node-js-the-right-way-fc50c060f23b

Generally speaking, there are two types of errors:

>> Errors we expect and know how to deal with... and errors we don't expect and don't know how to deal with.

### Errors we don't know how to deal with

For errors that we **don't know how to deal with**, usually, we would like to cancel the operation that was taking place because something bad happened. 

If it's an <u>http request</u>, we might throw back a `500` error to the client.

If it's a <u>script</u>, we might exit with a non-zero error code.

These are errors that really mess up what we were trying to do and can be caused by an infinite possibility of things that we didn't expect or assume would happen:

- database connectivity issues
- code typos
- null pointer errors (sometimes)
- out of memory

In this case, it truly makes sense for us to kill whatever it was we were doing and just exit gracefully or cancel the web request.

### Errors that we do know how to deal with

When we enounter an error that we do know how to deal with, we want to 

## Why throwing errors is bad

It breaks the flow of the program and has the same unpredictability of `GOTO` statements which were ommitted from modern programming languages due to their dangerous nature.

Throwing errors is the closest thing that we still have to goto statements today.

That's not to say that errors can't occur in our programs, they always will- no matter how hard we try.

But it might not be the best idea to practice throwing excessive errors as this makes the program harder to trace through.

One alternative is to use a `Result` class.

## The Result class

I first discovered the Result class while learning about Anemic Domain Models in a pluralsight course by Vladimir Khorikov.

Even though the course was in C#, we

```typescript
export class Result<T> {
  public isSuccess: boolean;
  public isFailure: boolean
  public error: string;
  private _value: T;

  private constructor (isSuccess: boolean, error?: string, value?: T) {
    if (isSuccess && error) {
      throw new Error("InvalidOperation: A result cannot be successful and contain an error");
    }
    if (!isSuccess && !error) {
      throw new Error("InvalidOperation: A failing result needs to contain an error message");
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


export class Animal {
  public name: string;
  private constructor (name: string) {
    this.name = name;
  }

  public static createAnimal (name: string): Result<Animal> {
    if (!!name === false) {
      return Result.fail<Animal>('Cant create an animal without a name');
    }

    if (name.length < 2) {
      return Result.fail<Animal>("Come on now, the animal's name has to be longer than a single character 🤔")
    }

    return Result.ok<Animal>(new Animal(name));
  }
}

class AnimalController {
  public static createAnimal (req: express.Request, res: express.Response) {
    const { name } = req.body;
    const animalOrError: Result<Animal> = Animal.createAnimal(name);
    if (animalOrError.isFailure) {
      return res.status(500).json({ error: animalOrError.error })
    }
  }

  public static readAnimal () {
    // read
  }

  public static updateAnimal () {
    // update
  }

  public static deleteAnimal () {
    // delete
  }
}
```



