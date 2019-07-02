---
templateKey: article
title: 'TypeScript vs. JavaScript [Pros / cons]'
date: '2019-05-11T00:05:26-04:00'
description: >-
  TypeScript is arguably one of the best things to come to the JavaScript world helping developers comfortably create complex enterprise software without anxiety. In this post, we briefly break down the pros and cons of TypeScript over JavaScript.
tags:
  - TypeScript
  - JavaScript
category: Web Development
image: /img/blog/compared/ts-js.png
published: true
---

In this article, we'll look at the pros and cons of TypeScript compared to JavaScript.

**For an in-depth guide on when to use TypeScript, check out my existing [When To Use TypeScript Guide](/articles/when-to-use-typescript-guide/)**.

# TypeScript

TypeScript, a **superset** of JavaScript meant for crafting enterprise applications. Sometimes known as _JavaScript that scales_.

## Pros

### Type Safety

One of the reasons why I think myself and a lot of other developers gravitated towards JavaScript intially was not only because it's the language of the web with tons of [really cool shit](https://github.com/stemmlerjs?tab=stars), but because we were annoyed with languages like **Java**. 

When you're just getting started programming and programming things at a small scale, types can be a huge nuisance towards <u>getting something to work</u>.

When you move throughout your career, take on more responsibility and work on bigger **complex-domain** problems, you're quickly needing the ability to express yourself using objects.

And in JavaScript, sometimes you have to do some funny stuff to ensure that the object you're enountering at runtime is in-fact, the type and _shape_ that you want it to be.

JavaScript-_r_'s are used to solving these kinds of problems with [Joi validations](https://github.com/hapijs/joi) and **Duck-typing**.

TypeScript makes this a whole lot cleaner and easier. The advent of **interfaces** alone in a programming language personally saves me a lot of time.

### Better expressability 

Being able to express to your team members what forms and object can take and the things that it can and cannot do is such a primitive requirement of object-oriented programming and good software design.

With JavaScript, we rely a little too much on **good class and variable naming** in order to describe intent.

TypeScript allows you to use **interfaces**, **abstract classes**, **types** (+ lots of different flavours of types such as [Union Types](https://www.typescriptlang.org/docs/handbook/advanced-types.html) and [Conditional Types](https://www.typescriptlang.org/docs/handbook/advanced-types.html)) in order to _represent your design intent_ and ensure that you and your team adheres to the contract for how things should be used.

### You can opt in to types

One of the beautiful things about TypeScript is the ability to opt in to using types. 

That means that you can be very specific with your typings by referencing other objects...

```typescript
class User {
  public name: Username;
  public email: Email;

  constructor (name: Username, email: Email) {
    this.name = name;
    this.email = email;
  }
}
```

or less specific by using primitives...

```typescript
class User {
  public name: string;
  public email: string;

  constructor (name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}
```

or you say _screw it_, and treat it like JavaScript...

```typescript
class User {
  public name: any;
  public email: any;

  constructor (name: any, email: any) {
    this.name = name;
    this.email = email;
  }
}
```

Sometimes, especially when dealing with packages or legacy modules of code that is fully written in JavaScript, I'll refer it with the `any` type. This helps if you don't want to spend the time to convert the module to TypeScript or write a [TypeScript Definition](https://github.com/DefinitelyTyped/DefinitelyTyped) for.

## Cons

### Addition build step required

The build step required in order to compile TypeScript down to JavaScript is something that I haven't seen mentioned too often on other resources.

Generally speaking, with all the TypeScript saves you- this additional overhead isn't too bad of a trade-off, but it does mean you have to go about doing the following tasks in different ways:

#### Running a single TypeScript file

You'll want to do `npm run install --save-dev ts-node` and use `ts-node` to run a single file like:

```bash
ts-node script.ts
```

#### Debugging TypeScript code in Visual Studio Code

You'll want to setup a [build task](https://code.visualstudio.com/docs/editor/tasks) to compile your TypeScript first before executing your [launch script](https://code.visualstudio.com/docs/editor/debugging) in order to run the debugger on the resulting JavaScript.

### You have to learn it

Like anything, you have to spend some time to learn it. The time investment is always a bummer.

But for me, I found that I was able to become productive with TypeScript within a couple of hours given that it closely resembled Java and that's what I learned programming with initially.

For newcomers to Object-Oriented Programming, it might be a little more challenging but ultimately, 95% of the difference is syntactical.

