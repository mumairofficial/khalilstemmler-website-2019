---
templateKey: blog-post
title: "An Introduction to Domain-Driven Design - DDD w/ TypeScript"
date: '2019-04-09T10:04:10-05:00'
description: >-
  Domain-Driven Design is the approach to software development which enables us to translate complex domain models into rich, expressive, and evolving software. It's the way we design applications when the needs of our users are complex.
tags:
  - DDD
  - TypeScript
  - Software Design
category: Domain-Driven Design
image: /img/blog/ddd-intro/ddd-intro.png
published: false
---

Have you ever worked on a codebase where it felt like "the more code I add, the more complex it gets"?

Have you ever struggled to tame that complexity? 

Have you ever been in the situation where you're scared to add new code to an existing codebase in the fear that you'll break something else in a completely different module?

And what about large companies? How do they get anything done? Their codebases must be massive. How do _they_ manage that complexity? 

How do they organize and logically separate large bodies of code, then assign teams to maintain and integrate them with other teams' code? 

I've been in these situations and I've wondered these things while coding on a backend Node.js app with a current lifespan of 3 years and a line count of ~150K+.

I came across **Domain-Driven Design** when I realized I needed it the most.

## Quick history about me

In 2017, I started working on an application called [Univjobs](https://univjobs.ca), a marketplace for Canadian students and recent-grads to find co-op jobs, gigs and entry-level jobs and internships.

The MVP was pretty simple. Students could sign up, create their profile and apply to jobs. Employers could sign up, post jobs, browse students and invite them to apply to the jobs they've posted.

Since 2017, we've iterated many times, adjusting and encorporating features based on feedback from students and employers like job recommendations, interviews and an Applicant Tracking System.

The codebase had became so large that adding new features took up to 3x the amount of time it would have taken when I first started. Lack of encapsulation and object-oriented design was largely the cause. I had an [Anemic Domain Model](/blank?todo=anemic-domain-model).

It was at this point I started to seek out how to address this problem.

## About Domain-Driven Design

Domain-Driven Design is an approach to software development that aims to provide a framework for creating software to **match the mental model** of the problem domain we're addressing.

![DDD Diagram](/img/blog/ddd-intro/ddd-diagram.svg)

Initially conceptualized by Eric Evans who wrote the [_bible_ of DDD](https://www.amazon.ca/gp/product/0321125215/ref=as_li_tl?ie=UTF8&camp=15121&creative=330641&creativeASIN=0321125215&linkCode=as2&tag=stemmlerjs09-20&linkId=170eea6252cf16310fc9e7694209e5ed) (famously known as the Blue Book), it's primary technical benefits are that it enables you to write expressive, rich and encapsulated software that's both testable and maintainable. 

Generally speaking, it enables us to do this through the use of a Layered Architecture, various domain modeling building blocks and a **Ubiquitous Language**.

The **Ubiquitous Language** is a common language that we learn best describes the domain model concepts, must be learned by actually spending time **talking with the domain experts**. This language, once agreed upon, is the way to connect what the software looks like to what actually occurs in the real world. 

> If we're building an app that helps recruiters hire talent, we need to spend some time understanding the domain language and processes that exist from the recruiters' perspective.

That means actually talking to the domain experts.

## Layered Architecture & Design Principles + Patterns

- understand why design and architecture are prerequisites of DDD, clear-cut way to write better backend Node.js code (principles + patterns are how to do it)

- Domain-Driven Design requires knowledge of SOLID design principles and patterns
- It's heavily influenced by the XP approach that Agile is well-known for, reducing the amount of up-front designs.
- YAGNI and KISS

## Building Blocks

Very briefly, here are the main technical artifacts involved in implementing DDD. 

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

We'll want to create domain objects in many different ways. We create objects using a factory from the raw sql rows, raw json, or the [Active Record](/blank?todo=active-record) that's returned from your ORM tool. We might also want to create domain objects from templates using the [prototype pattern](/blank?todo=prototype-pattern) or through the use of an [abstract factory](/blank?todo=abstract-factory).

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

Depending on the project, it might be more worthwhile to just continue building an [Anemic Domain Model](/blank?todo=anemic-domain-model). Choosing DDD coincides with a lot of the [arguments I made for when it's right to use TypeScript over JavaScript](/articles/when-to-use-typescript-guide/) for your project because of the Complex Domain Problem.

# Conclusion

I'm really glad you're here and you're reading this. 

If you're Junior Developer or getting started in the world of software architecture and design, I think you're on the right track.

Domain-Driven Design has introduced me to a world of software architecture, patterns and principles that myself and the majority my peers haven't naturally come across.

From my own experience, it's largely a "you don't know it until you need it" where:

a) you naturally realize yourself in the scenario of modeling a complex domain, so you seek out the patterns to address those problems or 

b) your codebase has become so large that it's hard to add new features without breaking new things, so you seek the solution to that problem or

c) you don't come from an enterprise Java or C# background or

d) someone more experienced than you brings it to your attention

The thing about Domain modeling is that it does take a little bit of time to start to get comfortable with. It can be a bit awkward to get accustomed to organizing your code this way, but when you start to reap the benefits of DDD, I think you'll naturally prefer to organize your backend code using this pattern over the common [Transaction Script](/blank?todo=transaction-script) approach.

