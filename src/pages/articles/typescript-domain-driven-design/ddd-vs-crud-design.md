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
image: /img/blog/ddd-value-object/value-objects.png
published: false
---

_This article is part of the **[Domain-Driven Design with TypeScript](/articles/categories/domain-driven-design/)** series_.


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
let max = -1;

numbers.map((num) => {
	max = Math.max(num, max)
})
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

In a **Layered Architecture**, the database and the http framework are both referred to as infrastructure layer concerns. 

I don’t think this is actually a bad way to design relatively straightforward and simple applications that just need to get up and running. You can be very scrappy and crafty by thinking this ways and you can get things up and running with by implementing the bare requirements to have the system working from end to end.

However, for complex domains with complicated business rules and policies, this doesn’t cut it anymore.

We probably shouldn’t design our business rules at the database level (we should use appropriate foreign and unique constraints but at the lowest level, we shouldn’t rely on it).   In CRUD applications, we almost solely **write imperative code to satisfy business use cases**. 

### REST-first code
Let’s say we were working on an application where `Customers` could rent `Movies`. 

Designing REST-first using [Express.js](https://expressjs.com/) and the [Sequelize ORM](http://docs.sequelizejs.com/), my code might look like this:

```typescript
class MovieController {
  public async rentMovie (movieId: string, customerId: string) {
    // Sequelize ORM models
    const { Movie, Customer, RentedMovie } = this.models;
    const movie = await Movie.findOne({ where: { movie_id: movieId }});
    const customer = await Customer.findOne({ where: { customer_id: customerId }});

    if (!!movie === false) {
      return this.fail('Movie not found')
    }

    if (!!customer === false) {
      return this.fail('Customer not found')
    }

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

So in this code example, we pass in a `movieId` and a `customerId`, then pull out the appropriate Sequelize models that we know we’re going to need to use.  We do a quick null check and then if both model instances are returned, we’ll create a `RentedMovie`.

This is quick and dirty and it shows you just how quickly we can get things up and running CRUD-first. But things start to get challenging as soon as we add **business rules**.

##### Business Rules in CRUD-first code

Let’s add some constraints to this. Consider that `Customer` isn't allowed to rent a movie if they:

	A) have rented the maximum amount of movies at one time (3, but this is configurable)
	B) have unpaid balances.

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

    // Sequelize ORM models
    const { Movie, Customer, RentedMovie, CustomerCharge, CustomerPayment } = this.models;
    const movie = await Movie.findOne({ where: { movie_id: movieId }});
    const customer = await Customer.findOne({ where: { customer_id: customerId }});

    if (!!movie === false) {
      return this.fail('Movie not found')
    }

    if (!!customer === false) {
      return this.fail('Customer not found')
    }

    const rentedMovies = await RentedMovie.findAll({ customer_id: customerId });
    const numberRentedMovies = rentedMovies.length;

    if (numberRentedMovies >= 3) {
      return this.fail('Customer already has the maxiumum number of rented movies');
    }

    const charges = await CustomerCharge.findAll({ customer_id: customerId });
    const payments = await CustomerPayment.findAll({ customer_id: customerId });

    const chargeDollars = charges.reduce((previousCharge, nextCharge) => {
      return previousCharge.amount + nextCharge.amount;
    });

    const paymentDollars = payments.reduce((previousPayment, nextPayment) => {
      return previousPayment.amount + nextPayment.amount;
    })

    if (chargeDollars > paymentDollars) {
      return this.fail('Customer has outstanding balance unpaid');
    }

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

- lack of encapsulation
	- another developer could inadvertently circumvent our domain logic, because it lives in a place where it shouldn’t be.
	- we could easily move this domain logic to a “Service” (see the Service-Oriented Architecture fallacy), and that would be a small improvement, but really- it’s just re-locating where this happens,  other developers will still be able to write the code we just did, in a separate module, and **circumvent the business rules**.
	- there needs to be a single place to dictate what actions a `Customer` can do, and that’s the domain model.

- lack of discoverability
	- When you look at a class and it’s methods for the first time, it should accurately describe to you the capabilities and limitations of that class. When we co-locate the capabilities and rules of the `Customer` in an infrastructure concern, we lose some of that discoverability for what a `Customer` can do and _when it’s allowed to do it_.
	- we’re representing a lot of different rich rules of the domain, from within an infrastructure concern (controller). 

- lack of flexibility
	- Most of the time, we’re concerned about making our application deliverable through HTTP.
	- For CRUD applications, yes- this is normally how we will be delivering it. The world lives on RESTful APIs. However, there are cases when you might need to integrate with an **older system**, perhaps SOAP or you want to be able to deliver your application as a **desktop application** as well. Maybe you want to experiment with GraphQL?  One way to go about doing that is to separate your **Use Cases** from the **infrastructure that executes your use cases**. 
	- But generally speaking, we should ensure to refrain from letting domain-logic live from within the domain layer.

Our **imperative** code in this single controller _transaction_ feels more like a hacked together **script** to just make it work (which can be good depending on the project, but not for enterprise ones).

#### CRUD-first design is a “Transaction Script” approach

In the enterprise software world, we call this Imperative way of writing code a **Transaction Script**. I first came to knowledge of the term from reading Martin Fowler’s book on Patterns of Enterprise Application Architecture.   I came to realize that Transaction Script was the approach I used to designing all of my backend code, all of it.  So how do we improve upon that? We use a **domain model**.

## DDD

In the DDD world, the one of the primary benefits of Domain Modeling is that we eventually hit an inflection point where the **declarative** language for specifying business rules becomes so expressive, that it takes us no time to add new capabilities and rules.  It also makes our code much more readable because we don’t have to constantly be concerned with the **how** it gets done, but more with **what** can get done and **when** it’s allowed to get done.

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

This is the **Declarative** essence of DDD. **How** it is done is abstracted, but the **ubiquitous language** being used effectively describes what the domain objects are allowed to do and when.

_In this example, it’s implied that we’ve used the Unit of Work pattern to persist the changed domain entities, but that **how**, we’ll address in a later article._





-----

REST-first design is Imperative, DDD is Declarative [Comparison] - DDD w/ TypeScript

This is the one that I'm saying that we should be doing this thing that we're doing.

What do you want your readers to get from this article?
- what is CRUD-first and REST-first design
- understand the differences between CRUD-First or REST-first design and DDD
- understand when CRUD-first design is good
- understand the drawbacks of CRUD-first design
- understand when it makes sense for DDD

Potential names for this thing
- Is CRUD/REST-First Design Bad? [Comparison] - DDD w/ TypeScript


Things You Can Do Today To Build Amazing API

When /wiki/3-categories-of-hard-software-problems/

# How DDD differs from RESTful Design

DDD is Declarative, so DDDD :) 

## Imperative vs. Declarative




