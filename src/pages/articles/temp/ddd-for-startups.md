---
templateKey: blog-post
title: "Avoiding Crippling Techncial Dept with Node.js, TypeScript + Domain-Driven Design"
date: '2019-06-16T10:04:10-05:00'
updated: '2019-06-16T10:04:10-05:00'
description: >-
  For startups that bring order to complex real-world problems, domain-driven design can help prevent coding your startup towards crippling technical dept.
tags:
  - Domain-Driven Design
  - Node.js
  - Software Design
  - Backend
category: Web Development
image: null
published: false
---

When we're writing code in an early-stage startup, one of the biggest challenges for developers tackling technical dept. After we've launched, being able to interate quickly on our MVPs hugely important. To do so, technical co-founders need to keep an eye on the amount of technical dept that we can humanly tolerate.

The most efficient (and common) approach to launching an MVP is to use **MVC (model-view-controller) architecture**. 

This is great because by launching quickly, we can present value to our users <u>almost immediately</u>.

During several iteration cycles our products, and learning more about how our product addresses the problems we solve for our users, we add additional _business logic_.

The quickest way to add new business logic is to simply use `if` and `else` statements and to organize code into `services` and away from `controllers`.

For example, look at all of the requirements and things that happen after we post a job as an `Admin` vs posting as a `Regular` user.

```javascript
function postJob (job, user) {
  if (!user.isAdmin) {
    // Charge the customer.
    // Add the job to our queue of new jobs for the week.
    // Trigger a gatsby build to rebuild our Gatsbyjs site.
    // Post the job to social.
    // Do a bunch of other stuff.
    // Send an email to the customer letting them know their job is active.    
  } else {
    // skip everything and just approve the job
  }
}
```

It's apparent we've missed a **Users & Identity** abstraction there, but that's OK! We have more importantant things to worry about (like growth, product-market fit, etc).

Even if you do hit that point where your startup is making money, you might realize (as I did with [Univjobs](https://univjobs)) that after several iterations, the codebase:

- becomes harder to reason about
- more bugs appear
- larger areas of code begin to become daunting to change
- it's harder to write tests for things

And then suddenly, **iteration cycles start to take longer**.

This is _very bad_.

I ran into this exact scenario 2 years into building my own startup and began seeking out the way to fix it. 

For my application built on React, Redux and Node.js, the answer was TypeScript and Domain-Driven Design.

--- 

In this article, I'll cover:


<ul class="aside">
  <li>When using a strictly-typed language (like TypeScript) is a necessity</li>
  <li>What Domain-Driven Design is</li>
  <li>How Domain-Driven Design can help you keep your iteration cycles up</li>
</ul>


## Why TypeScript

In software development, there are 3 types of hard problems:

The Performant System Problem, the Embedded System Problem, and the Complex Domain Problem. 

The _Performant System Problem_ is when we have to deal with scaling **the amount of users that our app can maintain at one time**.

The _Embedded System Problem_ is when we're **working with low-level programming languages like C or C++** to do **embedded system programming**.

The _Complex Domain Problem_ is when we have to deal with scaling **the growing complexity of our application**.

> TypeScript and other strictly-typed languages were meant to deal with the Complex Domain Problem

If you're building something complex (or if you're noticing that complexity is rising), consider using a strictly-typeed langauge.

Since iterating often involves making changes to what our application does, having **strict types** and being able to have the compiler work with us to catch bugs is **incredibly helpful**.

It's _not_ a necessity, but it certainly helps.

## Domain-Driven Design

Before we cover DDD, let's go back to MVC. 

In MVC, the "M" stands for "Model".

The unfortunate part about MVC is that the "M" is the **most important** but also **most generally misunderstood**.

In MVC, the `Model` is just responsible for _too much_ (validation, business rules, structure, relationships, etc). Without **modeling fundamentals**, it becomes hard to figure out where and how to effectively organize business layer logic.

We call apps with unorganized business-logic `Anemic Domain Models`.

![](/img/wiki/anemic/chart.svg)

`Anemic Domain Models` are usually a lot quicker to get started with, but by the time our codebase hits a certain level of complexity, it's incredibly hard to change code without breaking things.

### DDD and Model-Driven Design

Domain-Driven design is an approach to modeling software with complex needs that enables you to create a software implementation of your problem domain.

It answers the question of **how we structure the "M" in MVC**.

> Domain Driven Design enables us to organize a testable layer of code that is similar to your problem domain, and is responsible for all the business logic of your app.

It's like creating a software implementation of your real-world domain, but in code.  

It all starts with a `Domain Layer`.

#### Domain Layer

![](/img/blog/ddd/layers.svg)

In the Domain Layer is where everything that the `M` in MVC lives.

The Domain layer has 0 dependencies to anything from the outside world, and it's just _plain JavaScript objects_. 

It contains 100% of the business logic for our application and defines what's possible, and _when_.

### Infrastructure Layer

In this layer, we hook up things from the **outside world** like databases, Express.js web servers, controllers, routes, APIs and views. 

This is the `View` and `Controller` from MVC.

By using the **Separation of Concerns** principle and keeping the business logic layer _separate from the outside application layer_, we can effectively ensure that our **Domain Code** remains testable without having to spin up a database or a web server. That means our tests are fast as hell. 🏎️

---

Admittedly, it does take a little bit more of upfront effort (recall the graph shown earlier on anemic vs. rich models) to learn how to do **domain modeling** but it _really_ pays off in the long run. 

Donald Knuth once said that "premature optimization is the root of all evil", so the important part is knowing when to switch from an **anemic model** to a **rich one**. 

Hopefully you need to switch _after_ you start making money. Then all you have to focus on is making your startup code better!