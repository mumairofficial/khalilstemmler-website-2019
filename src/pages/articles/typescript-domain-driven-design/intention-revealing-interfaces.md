---
templateKey: article
title: "Intention Revealing Interfaces [w/ Examples] - Domain-Driven Design w/ TypeScript"
date: '2019-07-09T10:04:10-05:00'
updated: '2019-07-09T10:04:10-05:00'
description: >-
  An intention revealing interface is a standard for writing code that is expressive enough to adequately explain it's purpose without needing to explain implementation details. In this article, we look at how to use intention revealing interfaces to write code that is well-understood and expressive to the domain.
tags:
  - DDD
  - TypeScript
  - Intention Revealing Interfaces
category: Domain-Driven Design
image: /img/blog/templates/banners/ddd-blog-banner.png
published: true
---

Have you ever heard someone say that your code should be _so_ well-understood that it should be read like a book?

Those are the same developers who are usually **against writing comments**. Their argument is that comments are non-ideal because as soon as code gets changed, comments go out of date really quickly.

I tend to agree with that.

I think there's a more important reason why your code should be well-understood.

When new developers join your company and start to peer through your codebase, new developers might struggle with **how** to use your code.

More critically, even if it's undertstood _how_ to use something, new developers might struggle with _when_ it's the right choice to use that particular class or method.

In previous articles, we talked about the fact that [understanding the domain is _key_ to implementing the single responsibility principle](/articles/solid-principles/single-responsibility/) properly and writing decoupled code.

In this article, we're going to explore what it means to write **Intention Revealing Interfaces** and how it enables you to write code that improves comprehension as to **how** and **when** a particular class or method should be used.

---

In Eric Evans' seminal book about [Domain-Driven Design](https://www.amazon.ca/Domain-Driven-Design-Tackling-Complexity-Software/dp/0321125215/ref=asc_df_0321125215/?tag=googleshopc0c-20&linkCode=df0&hvadid=292950359971&hvpos=1o2&hvnetw=g&hvrand=2413492730734697031&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9000812&hvtargid=pla-449269547899&psc=1), he describes the need for something called an **Intention Revealing Interface** with respect to choosing the names for our classes, methods, etc.

Very simply put, 

> Name classes and operations to describe their effect and purpose, without reference to the means by which they do what they promise. - Los Techies [^1]

In my own words, an Intention-Revealing interface is:

Writing code... that reveals... the intention... to others! 

And doing that without regard for expressing _how_ it does it (ie: **encapsulation**).

Also, when we say **interfaces** here, we’re not necessarily referring to the `interface` that you and I best know: the OOP construct. In this case, we’re just referring to an interface as _whatever the client_ (be that a consumer of an SDK, and API, or a junior developer joining our company) _using our code will see_. We're referring to it more as "how the client uses our code".

## The client doesn't need to know

I was having a discussion with a colleague the other day about if it was OK to run additional logic in a `getter` without letting the client explictly know if we're doing that.

Of course it is.

Let's say we wanted to return the most popular `tracks` that were topping the charts.

```typescript
class Chart {
  get popularTracks (): Track [] {
    return this.props.tracks
      // Filter out tracks with no listens
      .filter((track) => track.listens.length > 0)
      // Sort them descending
      .sort((a, b) => b.listens.length - b.listens.length)
  }
}
```

This is basic OOP encapsulation. Consider the additional mental overhead if everytime we wanted to use a method or access a property, we had to look up the documentation for it to see if it was really the right one for us to use.

### Creating Domain Events

In the previous article about [where Domain Events get created](/blogs/domain-driven-design/where-do-domain-events-get-dispatched/), we demonstrated that sometimes we want to dispatch Domain Events within method calls or intercepted `getters` and `setters`.

Consider if we wanted to do some **change tracking** on our `Artist` domain entity from [White Label](https://github.com/stemmlerjs/white-label).

How would we go about creating a `ArtistEdited` domain event?

```typescript
class Artist extends AggregateRoot {
  private dirty: boolean = false;

  ...

  set name (name: string): void {
    this.props.name = name;
    // intercept our setter
    this.markDirty();
  }

  private markDirty (): void {
    if (!this.dirty) {
      this.dirty = true;
      this.addDomainEvent(new ArtistEditedEvent(this));
    }
  }
}
```

That ability to intercept changes to our domain model with [getters and setters](/blogs/typescript/getters-and-setters/) and create Domain Events that signify relevant occurrences in our domain, while saying _no more than necessary_ to the client of the API (through encapsulation) moves us closer to a [rich declarative domain model](/articles/enterprise-typescript-nodejs/when-crud-mvc-isnt-enough/).

## How to know when our ability to express intention is lost

Here’s what Evans says on how to know when we've run amuck.

> If a developer must consider the implementation of a component in order to use it, the value of encapsulation is lost.  - Evans (DDD)

If developers need to _know_ **how** something's works before they use it, then we’ve lost encapsulation.

Alright, so how _do_ we write code that tells other developers _what_ is done without having to show them exactly _how_ it’s done?

Two ways.

1. **Encapsulate** things that aren’t necessary for other developers to know about, and 
2. We **name things really well**.

We’ve talked about all the benefits of **encapsulation** in object-oriented programming, but in Domain-Driven Design, there’s an even more essential reason why it’s important. 

One of the primary goals of Domain-Driven Design is to "embed the domain terminology in the code" [^2]. 

Ideally, we would like to end up with an entire system that’s **more declarative** than imperative, can be understood by non-coders and domain experts, and educates newly onboarded developers about how the business actually works because the software is a **in-code representation** and solution of the actual problem domain.

That means we should check our variable names, methods, classes and Domain Events to ensure that we’ve effectively "capture[d] the domain model, in domain terms, through interactions with domain experts” [^2]. 

## Let’s make it perfectly understood exactly what this class is for

> If someone other than the original developer must infer the purpose of an object or operation based on its implementation, that new developer may infer a purpose that the operation or class fulfills only by chance. 

We should aim to be writing code that is irrefutable about _what_ it is and _what_ it does.

In fact, this is the primary theme of my short ebook [“Name, Construct & Structure”](/resources/names-construct-structure) and my approach to organizing features with [use cases](/articles/enterprise-typescript-nodejs/application-layer-use-cases/).

For example, a good practice for naming classes is to ensure that the **actual name** dictates what type of construct it is: 

Therefore: `UserController`, `UserRepository`, `UserMapper`, `User`.

Check out the [free book](/resources/names-construct-structure) if you're interested in learning more about how to name things.

## Let’s make it perfectly understood what this method needs

Have you ever seen code like this? Here’s an example I got from [Los Techies](https://lostechies.com/jimmybogard/2007/11/29/intention-concealing-interfaces-blob-parameters/).

```typescript
class MakeOffer extends UseCase {
  execute (items) {
    const vinyl = items[0];
    const trader1 = items[1];
    const trader2 = items[2];
  }
} 
```

Apparently this type of thing is pretty common in the Java and C# world as **blob** parameters.

In this `MakeOffer` class, it’s probably well understood that the [single responsibility](/articles/solid-principles/single-responsibility/) is to make an offer, but the parameter `items` in the `execute` method doesn’t **reveal anything** about what we were intended to pass in.

## Let’s make it perfectly understood what this class is _not_ for

> If [code used in one way] was not the intent, the code may work for the moment, but the conceptual basis of the design will have been corrupted, and the two developers will be working at cross-purposes. - Evans (DDD)

This is exactly what we strive so very hard to avoid. 

Consider we were  building the `Billing` subdomain in our [Vinyl Trading App](https://github.com/stemmlerjs/white-label) and we had a [Use Case](/articles/enterprise-typescript-nodejs/application-layer-use-cases/) called `BillCustomer`.

```typescript
class BillCustomerUseCase implements UseCase<any, any> {
  execute (customerItem): void {
	  // algorithm
  } 
}
```

At this point, you might ask me something like: 

> “uhh.. Khalil, why isn’t there something in there to dictate the amount of money you’re going to bill the customer? Don’t you need to pass that in as well?”

Sure. That’s one way you _could_ look at it. 

You could look at it as if the `BillCustomerUseCase` is a **general** use case that takes in an **amount** and a `customer` in order to bill them.

But yes, correct. That’s not very explicit from the design.

Perhaps, you might see it a different way.

> `customerItem`. does that mean I pass in a customer? Or is `customerItem` the item that we’re billing the customer with? Wait. If I pass in an item, like `vinyl`, how is it going to know which `customer` to bill? Is there an object for this? Like something that contains both the `itemId` and the `customerId`? It would have been really helpful if there was a type to associate with it…

Not only is it hard to figure out without types, and that's why [typescript is such a great choice for domain modeling](/articles/when-to-use-typescript-guide/), but that’s the least of our problems with this code. 

Let’s say that someone got this working to do **transactional charging**, where you get charged transactionally if you purchase a single item.

Nice.

Then, another developer comes along, takes one look at the code, and says:

> This is _definitely_ for billing subscriptions.

Maybe that other developer considers the absence of an `amount` parameter to signify that this use case meant for charging customers on **recurring charges**.

At that point, both developers are using this function for two separate reasons.

This is what Evans was warning us about when he said that the “conceptual basis of the design will have been corrupted” if two developers are working “at cross-purpose”.

We’ve already seen what happens when developers add code to something that changes for two very different reasons. That coupling becomes a big problem when those two different features evolve in different ways. An adjustment to one feature has the repeated risk to break the other (/articles/solid-principles/solid-typescript/#SRP). This violation of the **single responsibility principle** could have been avoided if we had used **intention-revealing interfaces** (ie: better names) and types for the parameters.

```typescript
interface Product {
  amount: number;
}

// Vinyl can be purchased
class PurchasedVinyl implements Product {
  public amount: number;
   
  constructor (amount: number) {
    this.amount = amount;
  } 
}

class AnnualSubscription extends Subscription implements Product {
  public amount: number;
   
  constructor (amount: number) {
    super();
    this.amount = amount;
  } 
}

class BillCustomerUseCase implements UseCase<any, any> {
  // Explicit parameters
  execute (customer: Customer, product: Product): void {
	  // Execute algorithm
  } 
}
```

Notice the improvement here? We're explicitly specifying what's required in the parameters here: a `customer` and a `product`. And it just so happens that with this design, we _do_ charge transactionally, and a `Subscription` is a type of `product` that we could charge for.

### Constantly ask yourself if the terminology sounds too "techy"

Try really hard not to use words that sound "techy" like `Processor`, `Creator` or and `Manager` for the names of your [domain layer]() constructs. 

If you notice that seems to be the case, there's a chance that you might have run amuck.

The language we use in the code should be similar to the language that the domain-experts use in the real world. 


[^1] Another great read on intention revealing interfaces. https://lostechies.com/jimmybogard/2007/11/29/intention-concealing-interfaces-blob-parameters/

[^2] Here's a great article by Steven A. Lowe on the 3 basic principles of Domain-Driven Design. He's currently working on his "Head First Domain-Driven Design" book. https://techbeacon.com/app-dev-testing/get-your-feet-wet-domain-driven-design-3-guiding-principles