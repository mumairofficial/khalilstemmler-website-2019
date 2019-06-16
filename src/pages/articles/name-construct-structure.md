---
templateKey: blog-post
title: 'Name, Construct & Structure | Organizing Readable Code [Free Book]'
date: '2019-06-15T10:04:10-05:00'
updated: '2019-06-15T10:04:10-05:00'
description: >-
  Naming code well, using well-understood technical constructs and structuring our projects well are three ways to improve our ability to change code quickly. Here's a free
tags:
  - TypeScript
  - JavaScript
category: Software Design
image: /img/blog/name-construct-structure/banner.png
published: false
---

When we’re designing software, it's important for us to have all three of these things.

What do we want them to take away from this?

- understand what names, constructs and structure mean in software development
- understand why we care about this
  - often, we spend more time reading code than we spend writing code
  - that means, we want to be able to know:
    - what something is
    - what it does
    - where it's located
      - as quickly as possible
  - if we're able to understand those things very quickly, then it can help us save time trying to find where code is, understanding what is is and undertstanding what it does.

- for name:
  - understand that choosing the name carefully is really important
    - show examples of good names and what we can imply from it
    - show examples of bad names and what we imply from them
  - show a rule for picking good names
    - domain that it belongs to + construct name is optimal approach
    - OR, if the code is "structured" in a folder with the "domain" name, we can omit the prepended domain name, since it's implied due to the fact that it's in the folder.
  - if you can't decide on a good name, it's better to be overly specific rather than to be very abstract
    - beware of "manager", "implementor", 
      - if you start to see these, it probably means that you might not know exactly what kind of construct is needed here. one usually exists.
      - for that reason, it's a good idea to be famililar with software design patterns and architectural patterns because there's pretty much a specific tool for everything, you just have to know what it is.
      - so try this, the next time you feel included to say "manager", implementor, "handler", etc, go digging for the appropriate construct that handles that.
  - one of the unique benefits of naming things well is that it can quickly convey to the reader "what it should do"
  
- for construct:
  - constructs are all of the tools in our developer toolbox that we use together to build web applications
  - different constructs are responsible for different things
  - examples:
    - RouteGuard's in Angular are responsible for guarding routes and allow for custom logic to be plugged in to determine if a route can be routed to or not.
    - controller: controllers are meant to handle web requests and pass
    - use cases: use cases are meant to execute a unique use case that makes sense to the domain, and shouldn't 
    - repository: a repository is responsible for pulling domain objects from the database through a number of different convenience methods and saving it to persistence as well.

  - notice that constructs are meant to do one thing and one thing very well.
  - combined with a "name" + "construct", they should be responsible for that one thing.
    - UserMap = responsible for mapping users
    - UserRepo = responsible for pulling users from the domain
    - UserController = responsible for handling web requests to execute domain logic through services or use cases.
  - if a construct is named "UserMap", and in an application that trades vinyl, we should be careful thinking about our architectural boundaries when we mention things like "vinyl" or "billing" like:

  interface IUserRepo {
    getVinylOwnedByUser(userId: string): Promise<Vinyl[]>;
  }

  - yes, that method does involve something to do with "users", but it appears that the single responsibility of that method is to retrieve Vinyl... retrieving vinyl would probably better be suited in a "VinylRepo".
  - these are the types of constant discussions that we have to make if we care about software design and architecture.
  - why do we care so much?
    - architectural boundaries
      - if we keep our code in architectural boundaries, it leaves options open for us in the future to potentially do many different things if our project grows such as:

      - delegate ownership to seperate teams
        - if we keep the boundaries at bay, this means that we would be able to allow separate teams to be responsible for seperate parts of our application.
        - they could perhaps, perform version control by themselves and then integrate their part of the application into the main app, later.

      - microservice deployment
        - another great reason to keep architural boundaries at bay is if we do that, we open up the possibility for us to split our silos of code into microservices.
        - when we're dealing with microservices, not only is there an architectural boundary that exists LOGICALLY throughout the codebase, but it also exists physically.
        - code is split into separate repos and communication between the deployments has to happen over the network (be it RESTful HTTP calls or some sort of Messaging Prototcol). 
      - Either way, as codebases grow larger, and more developers join companies, we look for ways to improve productivity and scalability. Keeping an eye on boundaries can make transitions a whole lot less painful.

- for structure
  - we're talkign mostly about the structure of your project.
  - where is code organized? 
  - this asks the question, "is it where it should be?"
  
  - look at several bad examples:
    - mailchimp example
    - packaging by infrastructure
      - bad because:
        - doesn't tell us anything about the project itself at a high level
          - imagine you picked up a dictionary and instead of being sorted by alphabetical order, it's sorted by the "types" of words. that's silly. 
          - it's just bad "UX" design because here, we're trying to design for us to be able to find what we need to find really really quickly,
          - features are developed vertically through the stack, this means that we would be flipping between folder to different constructs, and it takes a lot of mental energy to do that.
            - I believe we as humans can only really  remember 7 or so things at one time.
            - we can make itt a lot easier on ourselves
          - so let's introduce a better example

    - packaging by component/domain
      - also referred to by Uncle Bob is his "Clean Architecture" book as "Screaming Architecture".
        - it's called that because at a glance, we can easily tell "hey, this is a medical app" or "hey, this is a job seeking app", but for package by "infrastructre", we can't tell at all. We just see the construct names at the top level, and that's not very helpful at all. Doing that increases the amount of time it takes for us to find code that we need to.
      - rules:
        - first layer, split code by the domain
        - second layer, split code by the construct type
        - and that should be good enough
        - nesting:
          - sometimes we're a subdomain that is split into sub-subdomains
          - either repeat the rule, in the sub-folder or see if you can place it at the first-layer somehow by making the name even more specific. 
          - just understand the human nature of how we locate things.
      
- recap on everything:
  - choosing names is hard, but when we do it right we can say alot about the responsibilities of the code that's contained in the file, without even having to read it yet.
    - what to look out for:  
      - look out for naming things too generally, and assigning the code that lives inside of the files way too much responsibility.
      - for a guide to figure out how to properly assign responsibility, see my other article on Domain Knowledge & The Single Responsibility Principle and check out my upcoming SOLID book.
  - constructs: there's a construct that exists for just about everything. 
    - what to look out for:
      - look out for naming things "manager", "hander", etc. 
      - become familiar with the 24 GoF design patterns and some of the other patterns from Martin Fowler's "Patterns of Enterprise Application".
  - structure: putting your files where they belong relative to the subdomain/component/module it belongs to.


 


Alternatively titled “Organizing code in Modules, talks about packaging by component vs. Packaging by infrastructure.

Naming code well, using well-understood technical artifacts and structuring our projects well are three ways to improve the way that we can **change code quickly**. It’s important for us to have all three of these things when we’re designing software.
 Again, the ultimate goal for us is to be able to **change code quickly**. 

*Name*: What it should do
- Naming something by appending it with the domain it belongs to, or the domain event that it solves and prepending it with the name of the artifact  `UserController`, `JoinTeamPolicy`, `CompanyModel` etc.
	- I bugged up what I wanted to say here. But ultimately, I’m trying to say that either we use the “folder” or name to hold the artifact type + the name of it, signifying which subdomain it belongs to.
- Uncle Bob’s _Clean Code_ outlines a lot of good practices for naming things in a way that expresses their responsibility.

*Artifact*: What it does/the behaviour/responsibility of the thing.
- Different artifacts do different things. Models are responsible for representing what a concept in the domain is capable of and they should contain 0 dependencies to anything that’s outside of that domain.
- For some artifacts, this is pretty obvious. You wouldn’t add code to handle an Express.js request to perform CRUD on a `User` from within a file titled  `UserModel`. That type of behaviour sounds like it’s better suited inside of a `Controller`, not a `Model`. This is an obvious example.
- However, sometimes it’s not so obvious. Sometimes, in MVC applications, we end up putting the majority of our domain logic in the controller and we’re not sure how to tie it into the model.

...
public async handlePost (req: express.Request, res: express.Response) : express.Response {
	
	// some example where we're executing more domain logic than
    // we deem appropriate for the controller to know about.
    // Like trying to change questions on a job posting
}
- usually, the type of the artifact itself should give us a good idea of what the class should be responsible for.
- *Design patterns* are fundamentally different types of technical artifacts as well. I’d reason that an `Adapter` or a `Factory` or an `Abstract Factory` is a technical artifact.

*Structure*: Where it does what it should do.
- This is the hardest one to reason about. Usually, we struggle with this one the most. 
- Should we have a `controllers/` folder and put all of the controllers for our application in that one folder?
- Should split up our `routes` into separate Express.js routers? Should they be in their own domain’s folder like:
	- /routes
		  /users
		  /friends
		  /posts
		  /jobs
	
- - /users
		  /routes
		/friends
		  /routes
		/posts
		  /routes
		/jobs
		  /routes

## What happens when we miss a few?

### ✅Name + ✅Constructs - ❌Structure

When this is the case, we don’t know where new files should get added. 
It becomes really hard for us to reason about where we should place new code when the codebase starts to grow. And when the codebase get sufficiently large, it:
- takes mental energy for us to develop new features because we have to {flip between multiple files in order to develop a single feature }.


### ✅Constructs + ✅ Structure - ❌ Name
When we lack good names for things, we don’t know at a glance (from the folder level) the types of artifacts exist. 

Consider a folder structure for a project that integrates with the Mailchimp api to automate a list.

config.js
helpers/
 utils.js
index.js
interests.js
list.js
mail.js
mailchimp.js
package.json

`mail.js` and `list.js` seem like they might be models. `mailchimp.js` gives me the feeling that it might be some sort of `service` to the mail chimp API.

*this actually might not be the worst example in the world, we can think of something worse than this*

config/
  index.js
models/
  mail.js
  list.js
  interest.js
services
  mailchimp.js
helpers/
 utils.js
index.js
package.json

How’s this? Any better? Quite a bit. When we name our files and our folders well, it can reduce the amount of time it takes for us to take a guess at where we need to go to change code. It signals to us what the files in that folder might be responsible 