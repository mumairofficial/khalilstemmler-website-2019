---
templateKey: blog-post
title: "REST-first design is Imperative, DDD is Declarative [Comparison] - DDD w/ TypeScript"
date: '2019-05-15T10:04:10-05:00'
updated: '2019-05-15T10:04:10-05:00'
description: >-
  A comparison between designing Node.js applications using REST-first design and Domain-Driven Design.
tags:
  - DDD
  - TypeScript
  - Software Design
  - CRUD 
  - RESTful APIs
category: Domain-Driven Design
image: /img/blog/ddd-rest-first/rest-first.png
published: true
---

<p class="course-cta">
This is part of the <a href="/courses/domain-driven-design-typescript">Domain-Driven Design w/ TypeScript & Node.js</a> course. Check it out if you liked this post.
</p>

_Also from the **[Domain-Driven Design with TypeScript](/articles/categories/domain-driven-design/)** series_.

When you get a new Node.js project, what do you start coding first?

Do you start with the **database schema**? 

Do you start with the **RESTful API**?

Do you start with the **Models**?

_REST-first Design_ is a term I've been using it to describe the difference between what [Domain-Driven Design](/articles/domain-driven-design-intro/) projects and REST-first CRUD projects look like on a code level.

Just for reminders, REST stands for "Representational State Transfer", which is a architectural style towards designing APIs on the web with HTTP. 

In this article, I'm going to explain what a **REST-first Designed** codebase looks like, how it's **imperative** and how it differs from a **Domain-Driven Designed** project.

--- 

## Imperative vs. Declarative

Do we remember what **imperative** code is? 

### Imperative
You’ve probably written a lot of **imperative** code in your life, it’s usually the first thing we start out learning when we get into programming.

Imperative code is primarily concerned with _"how"_ we do something. We need to be very explicit for how the program's state gets changed.

#### Find the max number in an array [Imperative]

Here's an example of how we would determine the **max** number in an array of numbers, imperative style.

```typescript
const numbers = [1,2,3,4,5];
let max = -1;
for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] > max) {   
    max = numbers[i] 
  }
}
```

Because imperative programming requires you to specify the exact commands to specify "how" program state changes, in this example, we:

- have a list of numbers
- create a for loop starting at 0 
- increment i up to numbers.length
- and if number at the current index is greater than the max, then we’ll set that as the max

I'm sure you know how to code 😊 but I figured I'd list out every step to be succinct that this is what we do with imperative code. We define the _"how"_.

**REST-first Design** often ends up being imperative by nature. We'll look closer at that statement in a few moments.

### Declarative

Declarative programming is more concerned about the _“what”_. 

Because of this, declarative code is a bit more _"wordy"_ and abstracts away a lot of the details for expressability.

Let's look at the same example.

#### Find the max number in an array [Declarative]

```typescript
const numbers = [1,2,3,4,5]
const max = numbers.reduce((a,b) => Math.max(a,b))
```

Take particular notice of the **language** being used in this example.

Ask yourself,

> "which of the two examples would non-programmers be quicker to understand?"

Notice that in this example, the **language** better describes the _“what”_ than the imperative equivalent? 

That’s the beauty of declarative programming. Code is much more readable and program intent is easier understood (if operations are appropriately named).

Declarative style code is one of the primary benefits of designing software using **Domain-Driven Design**.

Now that we're refreshed on **Imperative** and **Declarative** style coding, we'll dive deeper into my statements.

## REST-first Design
When we build RESTful applications, we tend to think more about designing our applications from either:

- the database up and
- the API calls up

Because of this, there's a tendency to place the majority of our business logic in either controllers or **services**.

You might remember from Uncle Bob's "Clean Architecture", for controllers this is definitely  no-no.

And if you read his book of the same name, you might recall the _potential_ service-oriented fallacy of putting all the domain logic into services (hint: [Anemic Domain Models](/wiki/anemic-domain-model/)).

But this is the type of code that gets written when:

- we want to get something up and running quickly
- we use a framework, such as [Nest.js](https://nestjs.com/), holistically
- we want to respond to prototype apps
- we're working on small apps
- we're working on problems that are either #1 or #2 from the [Hard Software Problems](/wiki/3-categories-of-hard-software-problems/)

And it does suffice for a large number projects!

However, for complex domains with complicated business rules and policies, this has the potential to become incredibly difficult to change and extend as time goes on.

In REST-first CRUD applications, we almost solely **write imperative code to satisfy business use cases**. Let's take a look at what that looks like.

### REST-first code
Let’s say we were working on an application where `Customers` could rent `Movies`. 

Designing REST-first using [Express.js](https://expressjs.com/) and the [Sequelize ORM](http://docs.sequelizejs.com/), my code might look like this:

```typescript
class MovieController {
  public async rentMovie (movieId: string, customerId: string) {
    // Sequelize ORM models
    const { Movie, Customer, RentedMovie, CustomerCharge } = this.models;

    // Get the raw orm records from Sequelize
    const movie = await Movie.findOne({ where: { movie_id: movieId }});
    const customer = await Customer.findOne({ where: { customer_id: customerId }});

    // 401 error if not found
    if (!!movie === false) {
      return this.notFound('Movie not found')
    }

    // 401 error if not found
    if (!!customer === false) {
      return this.notFound('Customer not found')
    }

    // Create a record which signified a movie was rented
    await RentedMovie.create({
      customer_id: customerId,
      movie_id: movieId
    });

    // Create a charge for this customer.
	  await CustomerCharge.create({
      amount: movie.rentPrice
    })

    return this.ok();
  }
}
```

In this code example, we pass in a `movieId` and a `customerId`, then pull out the appropriate Sequelize models that we know we’re going to need to use. We do a quick null check and then if both model instances are returned, we’ll create a `RentedMovie` and a `CustomerCharge`.

This is quick and dirty and it shows you just how quickly we can get things up and running REST-first. 

But things start to get challenging as soon as we add **business rules**.

#### Business Rules in CRUD-first code

Let’s add some constraints to this. Consider that `Customer` isn't allowed to rent a movie if they:

> A) have rented the maximum amount of movies at one time (3, but this is configurable)

> B) have unpaid balances.

How exactly can we enforce this business logic? 

A primitive approach would be to enforce it directly in our `MovieController`’s `purchaseMovie` method like so.

```typescript
class MovieController extends BaseController {
  constructor (models) {
    super();
    this.models = models;
  }
  public async rentMovie () {
	const { req } = this;
    const { movieId } = req.params['movie'];
    const { customerId } = req.params['customer'];

    // We need to pull out one more model,
    // CustomerPayment
    const { 
      Movie, 
      Customer, 
      RentedMovie, 
      CustomerCharge, 
      CustomerPayment 
    } = this.models;

    const movie = await Movie.findOne({ where: { movie_id: movieId }});
    const customer = await Customer.findOne({ where: { customer_id: customerId }});

    if (!!movie === false) {
      return this.notFound('Movie not found')
    }

    if (!!customer === false) {
      return this.notFound('Customer not found')
    }

    // Get the number of movies that this user has rented
    const rentedMovies = await RentedMovie.findAll({ customer_id: customerId });
    const numberRentedMovies = rentedMovies.length;

    // Enforce the rule
    if (numberRentedMovies >= 3) {
      return this.fail('Customer already has the maxiumum number of rented movies');
    }

    // Get all the charges and payments so that we can 
    // determine if the user still owes money
    const charges = await CustomerCharge.findAll({ customer_id: customerId });
    const payments = await CustomerPayment.findAll({ customer_id: customerId });

    const chargeDollars = charges.reduce((previousCharge, nextCharge) => {
      return previousCharge.amount + nextCharge.amount;
    });

    const paymentDollars = payments.reduce((previousPayment, nextPayment) => {
      return previousPayment.amount + nextPayment.amount;
    })

    // Enforce the second business rule
    if (chargeDollars > paymentDollars) {
      return this.fail('Customer has outstanding balance unpaid');
    }

    // If all else is good, we can continue
    await RentedMovie.create({
      customer_id: customerId,
      movie_id: movieId
    });
    
    await CustomerCharge.create({
      amount: movie.rentPrice
    })

    return this.ok();
  }
}
```

There. It works. But there are **several drawbacks**.

## Lack of encapsulation

Another developer could inadvertently circumvent our **domain logic** and business rules when developing a new feature that intersects with these rules, because it lives in a place where it shouldn’t be.

We _could_ easily move this domain logic to a service. That would be a small improvement, but really, it’s just re-locating where the problem happens since other developers will still be able to write the code we just did, in a separate module, and **circumvent the business rules**. 

_There are more reasons. If you'd like to know more about how services can get out of hand, [read this](/wiki/anemic-domain-model/).

There needs to be a single place to dictate what actions a `Customer` can do, and that’s the domain model.

## Lack of discoverability

When you look at a class and it’s methods for the first time, it should accurately describe to you the capabilities and limitations of that class. When we co-locate the capabilities and rules of the `Customer` in an infrastructure concern (controllers), we lose some of that discoverability for what a `Customer` can do and _when it’s allowed to do it_.

## Lack of flexibility

Most of the time, we’re concerned about making our application deliverable through HTTP.

For CRUD applications, yes- this is _usually_ how we will be delivering it since the world lives on RESTful APIs. 

However, if you want your application to be multi-platform, integrate with an **older system** or deliver your application as a **desktop app** as well, we'll need to ensure that none of the business logic lives in controllers, and instead resides within the Domain Layer.

We'll want to do that so that different infrastructure technologies can execute the _use cases_ of the application.

--- 

Going back to how this code is **imperative**, it's **imperative** because we have to specify exactly _"how"_ everything happens.

When we **purchase a movie**, we're writing code to insert into a [junction table](/articles/sequelize-tags-junction-pattern/). 

That's not very **declarative**.

#### CRUD-first design is a “Transaction Script” approach

In the enterprise software world, Martin Fowler would call this a **Transaction Script** (article coming soon). 

I first came to knowledge of the term after skimming through Fowler’s [Patterns of Enterprise Application Architecture](https://www.amazon.ca/gp/product/0321127420/ref=as_li_tl?ie=UTF8&camp=15121&creative=330641&creativeASIN=0321127420&linkCode=as2&tag=stemmlerjs09-20&linkId=00c00303a51c5e84eaa0bc4e04221f29).

I also came to realize that the Transaction Script approach was the single approach I used to writing all of my backend code.

> REST-first Design (more often than not) is a Transaction Script

How do we improve upon that? We use a **domain model**.

## DDD

In Domain Modeling, one of the primary benefits is that we eventually hit an inflection point where the **declarative** language for specifying business rules becomes so expressive, that it takes us no time to add new capabilities and rules.

It also makes our business logic that much more readable, abstracting away **how** it gets done, and presenting more of **what** can get done and **when** it’s allowed to get done (that's not to say that the plumbing doesn't have to get laid).

If we were to take our previous example and look at it through DDD lenses, the controller code would probably look more like this:

```typescript
class MovieController extends BaseController {
  private movieRepo: IMovieRepo;
  private customerRepo: ICustomerRepo;
  
  constructor (movieRepo: IMovieRepo, customerRepo: ICustomerRepo) {
    super();
    this.movieRepo = movieRepo;
    this.customerRepo = customerRepo;
  }

  public async rentMovie () {
    const { req, movieRepo, customerRepo } = this;
    const { movieId } = req.params['movie'];
    const { customerId } = req.params['customer'];

    const movie: Movie = await movieRepo.findById(movieId);
    const customer: Customer = await customerRepo.findById(customerId);

    if (!!movie === false) {
      return this.fail('Movie not found')
    }

    if (!!customer === false) {
      return this.fail('Customer not found')
    }

    // The declarative magic happens here.
    const rentMovieResult: Result<Customer> = customer.rentMovie(movie);

    if (rentMovieResult.isFailure) {
      return this.fail(rentMovieResult.error)
    } else {
      // if we were using the Unit of Work pattern, we wouldn't 
      // need to manually save the customer at the end of the request.
	  await customerRepo.save(customer);
      return this.ok();
    }
  }
}
```

See that? Notice how much is abstracted away?

From our controller, we no longer have to worry about:
- if the `Customer` has more than the max number of rented movies
- if the `Customer` has paid their bills
- billing the `Customer` after they rent the movie.

In following articles on Domain **Entities** and **Aggregate Roots**, we'll go into more depth on how this works.

This is the **Declarative** essence of DDD. **How** it is done is abstracted, but the **ubiquitous language** being used effectively describes <u>what</u> the domain objects are allowed to do and <u>when</u>.

## Additional reading

[3 Categories of Hard Software Problems](/wiki/3-categories-of-hard-software-problems/)

<p class="course-cta">
This is part of the <a href="/courses/domain-driven-design-typescript">Domain-Driven Design w/ TypeScript & Node.js</a> course. Check it out if you liked this post.
</p>