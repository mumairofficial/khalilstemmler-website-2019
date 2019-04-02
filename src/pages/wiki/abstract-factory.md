---
name: Abstract Factory
templateKey: wiki
published: true
wikicategory: Design Patterns
wikitags: null
prerequisites: null
date: '2019-01-24T00:05:26-04:00'
updated: '2019-01-24T00:05:26-04:00'
image: null
plaindescription: The abstract factory pattern provides a way to encapsulate a group of individual factories that have a common theme without specifying their concrete classes.
---

Abstract Factory places constraints on how we should be constructing our concrete classes. We've been saying that we should never refer to concrete classes, never derive from them, never even speak their name, yadda yadda... But we need to create concrete classes somehow. We need to create concretions so that the methods that they implement and override can be used in our software somewhere. That's where the Abstract Factory comes into play- it's how we actually get instances of classes created.