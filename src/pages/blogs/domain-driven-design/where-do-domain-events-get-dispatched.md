---
templateKey: blog-post
title: "Where Do Domain Events Get Created? | DDD w/ TypeScript"
date: '2019-07-01T10:04:10-05:00'
updated: '2019-07-201T10:04:10-05:00'
description: >-
  In this post, I explain where and why Domain Events should be created by the entities that they belong to (which are often aggregate roots).
tags:
  - DDD
  - Domain Entities
  - Software Design
category: Domain-Driven Design
published: true
---

Domain Events are a _huge_ part of Domain-Driven Design. 

When implemented correctly, they allow us to **chain** domain-logic, maintain [single responsibility](/articles/solid-principles/solid-typescript/), and cross architectural boundaries (subdomains) using the Observer pattern (which is a well-known way to separate concerns and decouple async logic).

The question is: "where do Domain Events get created"? 

Domain Events are a part of the **domain layer**, so they belong with all the other domain layer constructs like [entities](/articles/typescript-domain-driven-design/entities/), [value objects](/articles/typescript-value-object/) and **domain services**.

OK cool, but where _exactly_ do they get created?

Right on the **entity**.

Allow me to explain.

To me, the most beautiful thing about Domain-Driven Design is that it urges you towards creating your own **domain-specific language (DSL)**.

You expose only the methods and attributes that <u>make sense</u> to the domain. And those methods and attributes only belong on **entities** and **value objects** that it <u>makes sense</u> to belong on.

Determining what **makes sense** is _hard_. It usually takes a lot of conversation with domain experts and multiple iterations of the model.

This increased importance on [YAGNI](/wiki/yagni/), and only exposing operations that are valid to the model are also a big reason why [getters and setters]() get a lot of usage for us in Domain-Driven Design. Because of them, we get to specify exactly what is allowed to be accessed/changed, when it's allowed to be accessed/changed, and what happens when it's accessed/changed. 

> A lot of those times, when certain things are accessed/changed, a Domain Event is created.

So if we were working on [White Label](https://github.com/stemmlerjs/white-label)'s feature that enables `Traders` to _accept_ or _decline_ `Offers`, we'd have to walk through [our process of determining where Domain Logic should belong](/blogs/typescript-ddd/how-to-figure-out-where-domain-logic-goes/).

Following that process, we'd discover that `acceptOffer()` and `declineOffer()` make mutations to the `Offer` entity itself, which can be done without the involvement of any other domain entities, so it makes sense to locate them directly on the `Offer` entity.

```typescript
export type OfferState = 'initial' | 'accepted'  | 'declined'

interface OfferProps {
  ...
  state: OfferState;
}

export class Offer extends AggregateRoot<OfferProps> {
  ...

  get offerId (): OfferId {
    return OfferId.create(this._id);
  }

  get offerState (): OfferState {
    return this.props.state;
  }

  public acceptOffer (): Result<any> {
    switch (this.offerState) {
      case 'initial':
        // Notice how there is not public setter for the
        // 'state' attribute. That's because it's important that
        // we intercept changes to state so that we can create and add
        // a Domain Event to the "observable subject" when it's
        // appropriate to do so.
        this.props.state = 'accepted';
        this.addDomainEvent(new OfferAcceptedEvent(this.offerId));
        return Result.ok<any>();
      case 'accepted':
        return Result.fail<any>(new Error('Already accepted this offer'));
      case 'declined':
        return Result.fail<any>(new Error("Can't accept an offer already declined"));
      default:
        return Result.fail<any>(new Error("Offer was in an invalid state"));
    }
  }

  public declineOffer (): Result<any> {
    switch (this.offerState) {
      case 'initial':
        // Same deal is going on here.
        this.props.state = 'declined';
        this.addDomainEvent(new OfferDeclinedEvent(this.offerId));
        return Result.ok<any>();
      case 'accepted':
        return Result.fail<any>(new Error('Already declined this offer'));
      case 'declined':
        return Result.fail<any>(new Error("Can't decline an offer already declined"));
      default:
        return Result.fail<any>(new Error("Offer was in an invalid state"));
    }
  }

  private constructor (props: OfferProps, id?: UniqueEntityId) {
    super(props, id);
  }
}
```

Because Domain Events are part of the core domain, we'll always want to try to place Domain Events as close to the entities as possible.

If we can trust that the domain layer will always generate the appropriate domain events, we can enable several applications (perhaps deployed in separate bounded contexts) to implement their _own_ varying [application layer](/articles/enterprise-typescript-nodejs/application-layer-use-cases/) logic.