---
templateKey: blog-post
title: When Should I Use TypeScript? - The Pragmatic Opinion
date: '2019-04-04T10:04:10-05:00'
description: >-
  null
tags:
  - TypeScript
  - Software Design
category: Web Development
image: /img/blog/time-for-typescript/typescript-time.jpg
published: false
---

Have you heard of that little programming language called **TypeScript**? You know, the one that Microsoft made? The one that's kinda [blowing up](https://redmonk.com/sogrady/2019/03/20/language-rankings-1-19/?utm_campaign=digest&utm_medium=email&utm_source=nuzzel)? 

Maybe you were like me, a true JavaScript purist. Why do I need TypeScript? I was doing _just fine_ coding away with React and Node without types. Prop types and Joi validation have been treating me just nicely, thank you.

Maybe you caved and gave it a shot. Started playing with it. Maybe you hated it because it reminded you of Java. Maybe you got annoyed with how you couldn't be super productive right away. 

These were some of my initial sentiments when I first started with TypeScript. 

I certainly didn't see the benefit... up until I started experiencing some really annoying stuff. Things like builds not failing when they should, buggy code and typos finding their way into production code somehow in addition to finding it increasingly challenging to express my designs in a really clean object-oriented way.

9 months later into using TypeScript, I've built new features in Angular apps for clients, I began compiling [Univjobs](https://univjobs.ca)'s React / Redux front-end with TypeScript and ported all Univjobs' backend services to TypeScript from vanilla Node.js, refactoring mass amounts of code along the way.

I've come to the very important conclusion that depending on your situation, context, project, skill level and other factors, that it's actually **dangerous** for your project to **NOT** be written using TypeScript today.

The front-end space, for one- is getting more and more complex. Certain features that were once considered bleeding-edge, are now very-much standard user exprience assumptions. 

For example, it's almost always expected that your app is going to still work offline in some capacity; and when users ARE online, it's also usually expected that they're going to get real-time notifications without having to refresh the page.

These are some pretty steep (but definitely not unrealstic in 2019) demands.

In this article, we'll take a look at some of the most common scenarios and projects and identify when it might be pretty vital for us to be using TypeScript, and when we could probably just do without it and  stick to vanilly JS.

****

Before we dive into different scenarios, we should actually talk about the three categories of really hard software problems to be solved.

## Categories of Hard Software Problems

Generally speaking, there are 3. The first being building Performant System Problem, the second, the Embedded System Problem, and the third being the with Complex Domain Problem.

### 1. The Performant System Problem

Let's talk about Twitter. 

Twitter is actually a really simple concept. 

You sign up, you make tweets, you like other people's tweets and that's pretty much it.

If Twitter is that simple, why couldn't someone else do it?

It's apparent that the real challenge for Twitter is not actually so much as "what it does", but it's "how it's able to do what it does". 

Twitter has the unique challenge of serving requests from approximately 500 million users every single day. 

The hard problem that Twitter solves is actually a **perfomance problem**.

When the challenge is performance, whether we use a strictly typed language or not is less important.

### 2. The Embedded System Problem

An embedded system is a combination of computer hardware and software, with the purpose of enabling control over the mechanical or electrical aspects of a system.

Most systems we use today are built on a very complex layer of code that, if not initially written in, compiles down to C or C++ usually. 

Coding in these languages is not for the faint of heart. 

In C, there is no such thing as objects; and we as humans like objects because we can easily understand them. C is procedural and this makes the code that we have to write in this language more challenging to keep clean. These problems also require knowledge of the lower-level details.

C++ does make life a whole lot better because it has object orientation, but the challenge is still fundementally interacting with lower-level hardware details.

Because we don't really have that much of a choice on the languages we use for these problems, it's irrelevant to discuss TypeScript here.

### 3. The Complex Domain Problem

For some problems, that challenge is less about scaling in terms of handling more requests, but scaling in terms of **the codebase's size**.

_Enterprise companies_ have **complex real life problems** to be solved. In these companies, the biggest engineering challenges are usually:

- being able to **logically** separate parts of that monolith into smaller apps (more accurately, microservices and bounded contexts) so that teams can be split up and assigned to maintain them
- handling integration and synchronization between these apps
- modeling the domain concepts and actually solving the problems of the domain
- creating a ubiquitous (all encompassing) language to be shared by developers and domain experts
- not getting lost in the mass amounts of code written and slowing down to the point where it becomes impossible to add new features without breaking existing ones

I've essentially described the types of problems that [Domain Driven Design](/not-sure-yet) solves. For these types of projects, you wouldn't even think about not using a strictly-typed language like TypeScript. 

#### Object-oriented JavaScript

If you don't choose TypeScript and instead, choose a dynamic language like JavaScript, it will require some extra effort to be successful. You will have to be **very confident** in your object modeling abilities and you'll have to know how to utilize the 4 principles of object-oriented programming (encapsulation, abstraction, inheritance and polymorhism) with vanilla JavaScript.

This can be hard to do. JavaScript doesn't naturally come with concepts of interfaces and abstract classes. 

Using JavaScript alone would require a certain level of discipline as a developer in order to keep the code clean, and to ensure your team shares the same discipline, experience and knowledge level on how to implement common design patterns in JavaScript. 

In Domain-Driven projects like this, the strong benefit from using a strictly typed language is _less_ about expressing what **can be done**, but more about using encapsulation and information hiding to <u>reduce the surface area of bugs</u> by limiting what domain objects are **actually allowed to do**.

This is most often a **backend problem**. It's also the reason why I moved my Node.js backend services to TypeScript. There's a reason why TypeScript's tag is "JavaScript that scales".

*** 

Out of all three categories of hard software problems, only the Complex Domain Problem is the one where TypeScript is an absolute necessity.

Besides this, there are other factors that might determine when it's best to use TypeScript for your JavaScript project. 

## Code size

Code size _usually_ ties back to the **Complex Domain Problem**, where a large codebase means a complex domain, but that's not always the case. 

When the amount of code a project has gets to a certain size, it becomes **harder** to keep track of everything that exists, and becomes **easier** to end up re-implementing something already coded. Duplication is an enemy to well designed and stable software.

This is especially heightened when new developers start coding on an already large codebase.

Visual Studio Code's autocompletion and Intellisense really helps to navigate through huge projects. It works really well with TypeScript, but it's somewhat limited with JavaScript.

For projects that I know will stay simple and small, or if I know that it will be thrown away eventually, I would be less pressed to recommend TypeScript as a necessity.

## Production software vs. pet projects

Production software is code that you care about, or code that you'll get in trouble for if it doesn't work. It's also code that you've written tests for. The general rule of thumb is that if you care about the code, you need to have unit tests for it. 

If you don't care, don't have tests. 

Pet projects are self-explanatory. Do whatever you like. You have no professional commitment to uphold any standards of craftsmanship whatsoever. 

Go on and make things! Make small things, make big things.

Experience the pain when your pet project turns into your main project which turns into production software, which is buggy because it didn't have tests or types 🙃

### Lack of Unit Tests

It's not always possible to have tests for everything, because, well- life.

In that case, I'd say that if you don't have Unit Tests, the next best thing you could have is compile-time checking with TypeScript; next best to that is runtime checking with Prop types.

However, compile time checking is **not a subsitute** for having unit tests. The good thing is that unit tests can be written in any language- so the argument for TypeScript here is irrelevant. What's important is that tests are written and we are confident about our code.


## Startups

Definitely use whatever helps you be most productive. 

At this time, it matters a lot less which language you choose.

The most important thing for you to do is to validate your product. 

Choosing a language (Java, for example) or a tool (like Kubernetes) that you heard would help you scale in the future, while being totally unfamiliar with it and needing to spend time learning, may or may not be the best option in the case of a startup.

Depending on how early you are, the most important thing for you to do is to be productive. 

In Paul Graham's famous article, [The Python Paradox](http://www.paulgraham.com/pypar.html), his main point is that startup engineers should just use the technology that maximizes their productivity.

Therefore, use whatever you're most comfortable with; types or no types. You can always refactor towards a better design once you know you've built something people actually want.

--- here so far

## Working on Teams

### Large teams

### Small teams

### Coding styles, standards and communication
- challenge with large teams is that everyone kind of has their own way to implement something

## Frameworks
- hard to solely rely on good variable naming. sometimes names aren't that good.
- on react & team communication. react is great, prop-types are excellent and usually good enough to establish what happens towards the component. but in larger apps, you'll often have other structures that need to be written. one of the best things about angular is that there is a framework tool for basically every single thing you need to make. need a route guard? got it. Need a reactive form? got it. Need dependency injection, routing and animation? we got it. and the API is well defined. In React, much of the fun comes from actually getting to implement these things ourselves, or choose the 3rd party libraries that we want to use. When it's up to us, if we're on a team- our coding styles might clash, etc- it's really up to us place a lot of importance on COMMUNICATION  but when react apps get really large, they can benefit from some types, especially because there are a myriad of ways for people to accomplish the same

# Conclusion

## You can always gradually start using TypeScript
- you can get started today, I literally took all of my vanilla node.js apps, used the ```allowJS: true``` setting in my tsconfig, and then I was off and running. I can gradually convert my project from typescript to node.

## Compile time errors are better than runtime ones

## It helps your object modeling skills
- everyone has said, once they get started, it feels weird to not 

## You won't look back
