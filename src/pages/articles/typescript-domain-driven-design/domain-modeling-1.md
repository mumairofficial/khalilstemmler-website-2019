---
templateKey: article
title: "Challenges in Aggregate Design #1 - Domain-Driven Design w/ TypeScript"
date: '2019-07-25T10:04:10-05:00'
updated: '2019-07-25T10:04:10-05:00'
description: >-
  In this series, we answer common questions in aggregate design. Here's an article orignating from the question, "How can a domain model reference a model from a different subdomain?" 
tags:
  - DDD
  - TypeScript
  - Software Design
  - Aggregates
category: Domain-Driven Design
image: /img/blog/ddd-aggregate-design-1/logo.png
published: true
---

Here's a question I got recently,

> Q: How can a domain model reference a model from a different subdomain?

The person who asked the question also gave me a few details about their actual problem.

> Order.create(userId) creates an order, which is only accepted if User.getReputation() is "trusted". A user's reputation is trusted if more than 10 products were shipped, otherwise it returns failure result.

OK, let's dive in.

I'm going to assume we're working on some sort of ecommerce platform containing a `Users` subdomain and a `Shipping` one.  

## User subdomain

In the `Users` subdomain, let's assume we have an aggregate root for `User`:

```typescript
interface UserProps {
  email: UserEmail;
  password: UserPassword;
}

class User extends AggregateRoot<UserProps> {
  private constructor (props: UserProps, id?: UniqueEntityID) {
    super(props, id);
  }
  
  public create (props: UserProps, id?: UniqueEntityID): <User> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.email, arguementName: 'email' },
      { argument: props.password, arguementName: 'password' }
    ]);

    if (guardResult.isFailure) {
      return Result.fail<User>(guardResult.error);
    }

    return Result.ok<User>(new User(props, id));
  }
}
```

I was thinking about the `user.getReputation()` method. Does it make sense for that to be on the `User` entity?

Is `reputation` even a concern in the `Users` subdomain?

I personally don't think so.

Here's why.

### Aggregate Boundaries

In Vaughn Vernon's DDD Book, he says:

> “When trying to discover the Aggregates in a Bounded Context, we must understand the model’s true invariants. Only with that knowledge can we determine which objects should be clustered into a given Aggregate.” - Excerpt From: Vernon, Vaughn. “Implementing Domain-Driven Design.”

I think there's a slight confusion as to which entity the responsibility of calculating `reputation` belongs to.

It's our natural instinct to assume that everything is the responsibility of `User`, because `Users` are primarily how we think about people using our systems.

But in DDD, we have to think a little more granularly. Especially if there are several subdomains.

In the example given, `reputation` is apparently calculated from the `User` aggregate. However, the calculation can only be determined by counting the number of "products shipped".

`Products` are not within the `User` **aggregate's consistency boundary**. The `User` entity doesn't contain a reference to the collection of `products`. And it shouldn't need  to.

### Determine responsibility by assigning use cases to subdomains

Remember from the section titled "**We discover use cases through conversation**" from [this article](/articles/enterprise-typescript-nodejs/application-layer-use-cases/) where we discovered that the `Users` subdomain is only responsible for **Identity & Access Management** and contains **use cases like**:

- `login(userEmail: UserEmail, password: UserPassword)`
- `logout(authToken: JWTToken)`
- `verifyEmail(emailVerificationToken: EmailVerificationToken)`
- `changePassword(passwordResetToken: Token, password: UserPassword)`

I think what we're missing is a `Merchant` aggregate in the `Shipping` subdomain like so:

```typescript
type ReputationType = 'unranked' | 'poor' | 'good' | 'great';

interface MerchantProps {
  products: WatchedList<Product>;
  shippedProducts: WatchedList<Product>;
  reputation: ReputationType;
}

export class Merchant extends AggregateRoot<MerchantProps> {
  ...
}
```
From this subdomain, I would expect to see more use cases like:

- `shipProduct(product: Product)`
- `getMerchantById(merchantId: MerchantId)`

### Calculating `Merchant` reputation

That solves the problem of us trying to figure out how to refer to an entity from a separate subdomain (which we usually do with application services / use cases in correct cases).

But now, how do we calculate `ReputationType`? 

At first glance, the obvious approach would be to tally up all of the products shipped like so:

```typescript
export class Merchant extends AggregateRoot<MerchantProps> {
  ...
  public getReputation (): ReputationType {
    const numProductsShipped = products.getItems()
      .reduce((curr, product) => !!e.shipped ? curr + 1 : curr, 0);

    if (shipped < 5) {
      return 'unranked'
    } else if (shipped >= 5) {
      // etc and so on.
    }
  }
}
```

But since `Merchant` has a 0-to-many relationship with `Product`, that unbounded relationship could end up spanning hundreds or thousands of `products`.

That would mean we would have to ensure we retrieve all products from the repo when we retrieve a `Merchant`... always.

Not ideal.

Here's a better approach.

## Updating `Reputation` after every `ProductShippedEvent` domain event

Since `Product` is under the consistency boundary of `Merchant`, we could add a method to `Merchant` to mark a `product` as shipped.

```typescript
export class Merchant extends AggregateRoot<MerchantProps> {
  public shipProduct (product: Product): void {
    
    // Add the item to shipped products so that the 
    // Product repo can save it as updated when we
    // persist the domain entity. 
    this.shippedProducts.addItem(product);

    // Create a domain event for the product shipment
    this.addDomainEvent(new ProductShippedEvent(product))
  }
}
```

And then, from the same subdomain, we could subscribe to the Domain Event.

```typescript
// src/modules/shipping/subscribers

export class AfterProductShippedEvent implements IHandle<ProductShippedEvent> {
  private merchantRepo: IMerchantRepo;
  private productRepo: IProductRepo;

  constructor (merchantRepo: IMerchantRepo, productRepo: IProductRepo) {
    this.merchantRepo = merchantRepo;
    this.productRepo = productRepo;

    DomainEvents.register(this.onProductShippedEvent.bind(this), ProductShippedEvent.name);
  }

  private onProductShippedEvent (event: ProductShippedEvent) : Promise<any> {
    const numberShippedProducts: number = await this
      .productRepo.countNumberShippedProducts(event.product.merchantId);
    
    // Use a domain service to calculate the reputation.
    // We want to ensure that we encapsulate as much domain logic
    // in the domain layer as possible.

    let newMerchantReputation: ReputationType = MerchantReputationService
      .calculateReputation(numberShippedProducts);

    // Set the reputation
    await this.merchantRepo
      .setMerchantReputation(event.product.merchantId, newMerchantReputation);
  }
}
```

This is what we call **eventual consistency** and it's within the realm of topics related to but not constrained to [CQRS](https://martinfowler.com/bliki/CQRS.html).
