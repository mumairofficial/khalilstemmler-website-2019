---
name: The Dependency Rule
templateKey: wiki
published: true
wikicategory: Design Principles
wikitags:
  - SOLID
  - Architecture
prerequisites:
  - Interface
  - Abstract class
date: '2019-07-30T00:05:26-04:00'
updated: '2019-07-30T00:05:26-04:00'
image: /img/wiki/dependency-rule/clean-architecture-layers.svg
plaindescription: A software architecture rule that specifies the relationship between layers, namely that an inner layer should never rely on anything from an outer layer. 
---

### The Dependency Rule

In Uncle Bob's book, he describes **the dependency rule**.

That rule specifies that something declared in an outer circle <u>must not be mentioned in the code by an inner circle</u>.

_In other diagrams, there are many more layers. The rule still applies._

That means that code can only point inwards.

Domain Layer code can't depend on Infrastructure Layer code.

But Infrastructure Layer Code _can depend_ on Domain Layer code (because it goes inwards).

When we follow this rule, we're essentially following the [Dependency Inversion](dependency-inversion/) rule from the [SOLID Principles](/articles/solid-principles/solid-typescript/).

