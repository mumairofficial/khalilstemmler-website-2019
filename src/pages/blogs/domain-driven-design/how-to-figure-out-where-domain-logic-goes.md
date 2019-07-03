---
templateKey: blog-post
title: "How To Decide Where To Put Domain Logic | DDD w/ TypeScript"
date: '2019-07-01T10:04:10-05:00'
updated: '2019-07-201T10:04:10-05:00'
description: >-
  In this post, I walk you through a process for determining where different types of domain logic belongs in a Domain-Driven Design project.
tags:
  - DDD
  - Domain Entities
  - Software Design
category: Domain-Driven Design
published: true
---

The reason we use Domain-Driven Design is because when our applications get sufficiently complex, we need to figure out better ways to organize domain logic than how we normally do with MVC in [RESTful CRUD](/articles/enterprise-typescript-nodejs/when-crud-mvc-isnt-enough/) applications.

## Domain Events

During the process of figuring out our requirements and understanding the domain, sometimes we'll hear language being used that sounds similar to:

> "when _this_, then do _this_" or "when _this_, do _this_ only if _this_ has _this_"

When we hear that, we should automatically think "Domain Events".

Domain events should be named in the form of `[Entity][Past Tense Verb]Event`.

Some examples are: `VinylCreatedEvent`, `VinylUpdatedEvent`, `OfferAcceptedEvent`, `OfferDeclinedEvent`.

Just the, it naturally signifies that the **model** will be responsible for the **verb**/**method**.

Therefore: `VinylCreatedEvent` = `Vinyl.create(props: VinylProps, id?: UniqueEntityId)`.

Therefore: `VinylUpdatedEvent` = `vinyl.update(props: VinylProps)`.

Therefore: `OfferAcceptedEvent` = `offer.accept()`.

And it just so happens that we would also [create those domain events](/blogs/typescript-ddd/where-do-domain-events-get-dispatched/) within those entity method invokations.

Validation and Invariant Logic => Value Objects & Entities