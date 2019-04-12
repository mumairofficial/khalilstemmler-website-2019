---
templateKey: blog-post
title: "An Introduction to Domain-Driven Design - DDD w/ TypeScript"
date: '2019-04-09T10:04:10-05:00'
description: >-
  Domain-Driven Design is the approach to software development which enables us to translate complex problem domains into rich, expressive and evolving software. It's the way we design applications when the needs of our users are complex.
tags:
  - DDD
  - TypeScript
  - Software Design
category: Domain-Driven Design
image: /img/blog/ddd-intro/ddd-intro.png
published: true
---

Have you ever worked on a codebase where it felt like "the more code I add, the more complex it gets"?

Have you ever wondered, "how _do you_ organize business logic anyways"?

Or have you ever been in the situation where you're nervous to add new code to an existing codebase in the fear that you'll break something else in a completely different part of the code somewhere?

What about enterprise companies? How are _they_ doing it? Their codebases must be massive. How do they get anything done? How do _they_ manage that complexity? 

How are able they able to break off large bodies of code, assign them to teams, and then integrate all the teams together? 

I've wondered all of this while coding on a 3 year old Node.js app with a line count pushing ~150K+.

I came across **Domain-Driven Design** when I realized I needed it the most.

## Quick history about me

In 2017, I started working on an application called [Univjobs](https://univjobs.ca), a marketplace for Canadian students and recent-grads to find co-op jobs, gigs and entry-level jobs and internships.

The MVP was pretty simple. Students could sign up, create their profile and apply to jobs. Employers could sign up, post jobs, browse students and invite them to apply to the jobs they've posted.

Since 2017, we've iterated many times, adjusting and encorporating features based on feedback from students and employers such as job recommendations, interviews and an Applicant Tracking System.

Eventually, the codebase had became so large that adding new features on top of it took nearly 3x the amount of time it would have taken when I first started. 

Lack of encapsulation and object-oriented design were to blame.

I had an [Anemic Domain Model](/wiki/anemic-domain-model).

It was at this point I started to seek out solutions to the problem.

## About Domain-Driven Design

Domain-Driven Design is an approach to software development that aims to provide a framework for creating software to **match the mental model** of the problem domain we're addressing.

![DDD Diagram](/img/blog/ddd-intro/ddd-diagram.svg)

Initially conceptualized by Eric Evans who wrote the [_bible_ of DDD](https://www.amazon.ca/gp/product/0321125215/ref=as_li_tl?ie=UTF8&camp=15121&creative=330641&creativeASIN=0321125215&linkCode=as2&tag=stemmlerjs09-20&linkId=170eea6252cf16310fc9e7694209e5ed) (famously known as the Blue Book), it's primary technical benefits are that it enables you to write **expressive**, **rich** and **encapsulated** software that's both testable and maintainable. 

Generally speaking, it enables us to do this through the use of a [Layered Architecture](/blank?todo=layered-architecture), domain-modeling building blocks, and a **Ubiquitous Language**.

The **Ubiquitous Language** is a common language that best describes the domain model concepts. It must be learned by actually spending time **talking with the domain experts**. This language, once agreed upon, is the way to connect what the software looks like to what actually occurs in the real world. 

> If we're building an app that helps recruiters hire talent, we need to spend some time understanding the domain language and processes that exist from the recruiters' perspective.

That means actually talking to the domain experts.

## Layered Architecture & Design Principles + Patterns

Domain-Driven Design requires fundemental knowledge of software design patterns and principles. It works well in an Agile context and places importance on delivering the simplest thing possible first ([YAGNI](/wiki/yagni)), then improving on it's design iteratively.

The challenge is: you **need to know** these fundemental design principles and patterns in order to design well the first time. It's a lot harder to do DDD well if we make a mess. 

> In order to go fast, we must go well.

In order to do DDD well, we need to keep the [SOLID principles](/blank?todo=solid) in mind, organize a central domain layer at the core of our [Layered Architecture](/blank?todo=layered-architecture), and implement interface adapters to persistence, web and external technologies. We don't want these things to sully our domain model.

We want to keep them at a distance so that we can isolate our domain and keep our unit tests fast.

![clean architecture](/img/blog/ddd-intro/clean.jpg)
<div class="caption">"The Clean Architecture". From the golden Uncle Bob archives. Also known as a Layered Architecture, Ports & Adapters, Hexigonal, etc.</div>

### JavaScript community on Enterprise Application Development

I studied Java in high-school and University. Like a lot of my peers, I really didn't LOVE Java a whole lot because: 

a) We hated seeing red lines in the compiler all the time, this was scary for a 1st year University student learning how to program and 

b) The community around Java appeared to be mostly focused on enterprise application patterns and frameworks. Concepts like POJOs, JavaBeans, dependency injection and aspect oriented programming were not _cool_ nor did we aim to understand them or their uses (I should also mention, these were the early days of learning when some of us thought Java and JavaScript were the same thing 😜). 

When I first picked up a book on Node.js and was introduced to JavaScript, I was blown away by all the cool things you can do with JavaScript, HTML and CSS. 

The community was much more interesting that the Java community to me as a musician and a gamer (at the time).

Like many others, we learned how to build Node.js backends through YouTube, [Scotch.io](https://scotch.io), [Udemy](https://udemy.com) and [Udacity](https://udacity.com) courses. This was also the extent to which a large number of developers from my generation learned about software design.

Model + view + controller.

This works great for a large number of RESTful web backends, but for applications where the problem domain is complex, we need to break down the "model" part even further.

To do that, we use the **building blocks** of DDD.

## Building Blocks

Very briefly, these are the main technical artifacts involved in implementing DDD. 

### Entities

These are objects that we care to uniquely identify. They have a lifecycle where they can be created, updated, persisted, retrieved from persistence, archived and deleted. 

Entities are compared by their **unique identifier** (usually a UUID or Primary Key of some sort).

### [Value Objects](/articles/typescript-value-object/)

Value objects have no identity. They belong as attributes of Entities. Think `Name` being a Value Object on a `User` entity.

They're compared by their **structrual equality**.

### Aggregate

These are a collection of entities are that bound together by an aggregate root. The aggregate root is the thing that we refer to for lookups. No members from within the aggregate boundary can be referred to directly from anything external to the aggregate. This is how the aggregate maintains consistency. This is how we model relationship tables and tags.

### Domain Services

This is where we locate domain logic that doesn't belong to any one object conceptually.

### Repository

We use repositories in order to retrieve domain objects from persistence technologies. Using software design principles like the [Liskov Subsitution Principle](/blank?todo=liskov-substitution-principle) and a layered architecture, we can design this in a way so that we can easily make architecture decisions to switch between an in-memory repository for testing, a MySQL implementation for today, and a MongoDB based implementation 2 years from now.

### Factory

We'll want to create domain objects in many different ways. We map to domain objects using a factory that operates raw sql rows, raw json, or the [Active Record](/blank?todo=active-record) that's returned from your ORM tool (like Sequelize or TypeORM). 

We might also want to create domain objects from templates using the [prototype pattern](/blank?todo=prototype-pattern) or through the use of an [abstract factory](/blank?todo=abstract-factory).

### Domain Events

Domain events are simply objects that define some sort of event that occurs in the domain that domain experts care about.

***

## Technical Benefits

- write testable business-layer logic
- spend less time fixing bugs
- watch a codebase actually improve over time as code gets added to it rather than degrade
- create long-lasting software implementations of complex domains

## Technical Drawbacks

Domain modeling is time-consuming up front and it's a technique that needs to be learned.

Because it involves a lot of encapsulation and isolation of the domain model, it can take some time to accomplish.

Depending on the project, it might be more worthwhile to continue building an [Anemic Domain Model](/wiki/anemic-domain-model). Choosing DDD coincides with a lot of the [arguments I made for when it's right to use TypeScript over JavaScript](/articles/when-to-use-typescript-guide/) for your project. Use DDD for #3 of the _3 Hard Software Problems_: The Complex Domain Problem.

# Conclusion

I'm really glad you're here and you're reading this. 

If you're Junior Developer or getting started in the world of software architecture and design, I think you're on the right track.

Domain-Driven Design has introduced me to a world of software architecture, patterns and principles that I might not have naturally started learning until much later.

From my own experience, it's largely a "you don't know it until you need it" kind of thing where:

a) you realize you need to model a complex domain and it seems daunting so you try to find the right methology to approach it or

b) your codebase has become so large that it's hard to add new features without breaking new things, so you seek the solution to that problem or

c) someone more experienced than you brings it to your attention

d) you read my article and you realized [you have an anemic domain model](/wiki/anemic-domain-model) and you don't wish to have one.

The thing about Domain modeling is that it does take a little bit of time to start to get comfortable with. It can be a bit awkward to get accustomed to organizing your code this way, but when you start to reap the benefits of DDD, I think you'll naturally prefer to organize your backend code this way over the [Anemic Domain Model](/wiki/anemic-domain-model) and [Transaction Script](/blank?todo=transaction-script) approach.

_More in this series so far_..

[Value Objects - DDD w/ TypeScript](/articles/typescript-value-object)
