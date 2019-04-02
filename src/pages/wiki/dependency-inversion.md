---
name: Dependency Inversion
templateKey: wiki
published: true
wikicategory: Design Principles
wikitags:
  - SOLID
prerequisites:
  - Concrete class
  - Interface
  - Abstract class
date: '2019-01-24T00:05:26-04:00'
updated: '2019-01-24T00:05:26-04:00'
---

The D in SOLID stands for Dependency Inversion. This when the flow of control gets inverted at
runtime; it's caused by when we refer to interfaces and abstract classes, rather than the concrete classes.

It's through using DI that we're

Not to be confused with Dependency Injection, Dependency Inversion allows us to defer writing dependent classes by refering to an interface or an abstraction.

Here's an example in TypeScript...

```typescript

// cats, robots

class RoboCat {

  constructor () {

  }

}

```

If we were to draw a directed graph, it would look like this:
- draw an image

This means that we only ```import`` interfaces or abstract classes, never concrete classes. 

In TypeScript, this is easy to accomplish because constructs and keywords like ```interface``` and ```abstract``` exist and allow us to better understand the difference between concrete classes which implement and extend the abstractions vs. the abstractions. 

In JavaScript, it's a little bit more difficult to see the difference, it's not possible at a purely syntactic level, we need to dive into semantics. Pretty much, anytime we're implementing the methods of some abstraction, that's a concrete class.

Uncle Bob's rules:
1. Don't refer to concrete classes. Refer to abstract interfaces instead. This puts a constraint on object creation and generally enforces the use of Abstract Factories.

2. Don't derive from volatile concrete classes. 

3. Don't override concrete functions. These require source code dependencies

4. Never mention the name of anything concrete.

Other related topics:
- Dependency Rule
Why: Dependency Inversion is the most noticable principle in high-level top-down design. We can actually see the direction that dependencies flow. Dependency Inversion is the basis of the Dependency Rule.

- Abstract Factory 
Why: Dependency Inversion places constraints on how we should be constructing our concrete classes. We've been saying that we should never refer to concrete classes, never derive from them, never even speak their name, yadda yadda... But we need to create concrete classes somehow. We need to create concretions so that the methods that they implement and override can be used in our software somewhere. That's where the Abstract Factory comes into play- it's how we actually get instances of classes created.

- Concrete classes
Why: These are the classes that we're saying that we should never refer to directly. These are the classes that we should "inadvertently"... "depend"... on... through  Dependency Inversion. 

- Volatility (can probably belong in concrete classes)
Why: We 
