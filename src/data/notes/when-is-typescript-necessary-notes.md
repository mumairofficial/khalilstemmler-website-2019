***

I remember when I got my first taste of enterprise Java code during my co-op. 

I can just remember spending so much time trying to change one simple thing in the code, but not being able to find where to change it, and seeing so many nearly empty Java classes. I kept wondering, "where is the code? I don't know where anything starts or where it gets run". 

This is a common situation for Junior Developers in enterpise contexts to be in. 

The code's Domain model is so rich and encapsulated, that it's hard for Junior Developers to understand where to add code because it's hard to trace the path of execution where they're normally used to seeing code being executed in a more procedural manner.

***


Body Rough Notes and Points:

- [Done] there are 3 categories of software problems
- [Done] when complex (DDD)
- (too specific to the topic of DDD, lets move this to another article in the future). lets when a lot of different entities exist in your app, have to create validators in your models closer to the models and further away from the services (see an anemic domain model)
- [] when you're serious about preventing bugs and shipping quality software. its good to use joi validation and be strict about your unit testing, but it does require a level of professional discipline to follow TDD and approach that asymptote of 100% code coverage. When that's unrealistic, TypeScript is your next best bet.
- less bugs equals better code
- when you're working on large teams, it's great. even though naming things is halg the battle, really descriptive variable names can only go so far.
- on react & team communication. react is great, prop-types are excellent and usually good enough to establish what happens towards the component. but in larger apps, you'll often have other structures that need to be written. one of the best things about angular is that there is a framework tool for basically every single thing you need to make. need a route guard? got it. Need a reactive form? got it. Need dependency injection, routing and animation? we got it. and the API is well defined. In React, much of the fun comes from actually getting to implement these things ourselves, or choose the 3rd party libraries that we want to use. When it's up to us, if we're on a team- our coding styles might clash, etc- it's really up to us place a lot of importance on COMMUNICATION  but when react apps get really large, they can benefit from some types, especially because there are a myriad of ways for people to accomplish the same


- backend node.js code especially benefits from typescript. In node, it really is the wild wild, west. you can do anything. There's a lot of benefits that you can get from object oriented programming and we won't got into detail about them all right now, but unless you're very comfortable with design patterns, your SOLID principles, how to write clean code, and how to program in a way where you minimize the surface area of potential areas, unless you really know what you're doing and exactly how it translates to an object-oriented context, it's really really hard to scale pure vanilla JS Node.js code.

- backend is usually where you need to be a little bit more clever.

- small backends are usually OK 

- there's a reason why they call TypeScript, JavaScript that scales.

- eventually, you become so comfortable with TypeScript and it's so quick to 

- you can get started today, I literally took all of my vanilla node.js apps, used the ```allowJS: true``` setting in my tsconfig, and then I was off and running. I can gradually convert my project from typescript to node.

- startups: just do whatever helps you be most productive. At this time, it doesn't really matter. the most important thing for you to do is to validate your product. using some language (like Java) or tool (like Kubernetes) while you're not really even familiar with them is totally not important when you're just starting out. the most important thing for you to do is to be productive. Use whatever language you want. Types or no types. You can always refactor towards a better design once you know you've built something people actually want.


- YAGNI: You Aren't Going To Need It.
The thing is, you'll know when you're going to need it. If you're comfortable with it, you'll end up starting most projects with TypeScript and you'll reap massive benefits from it.

But if you're not quite sure if you need it yet, and you're doing just fine, keep on doing your thing, cowboy or cowgirl.


Step 1: Identify your audience
Which buyer persona are your writing this post for?

- this is for junior developers, people who know javascript and keep on hearing about typescript and if it's worthwhile to learn it. They are curious to know if they should learn it or not and why.

Step 2: Identify your key takeaway
what do you want your audience to know how to do after reading your blog post?

- Identify when it's dangerous to not be using TypeScript.

- Benefits of TypeScript
- [Done] I want my audience to know exactly what scenarios it is vital to use TypeScript in, and if they don't use TypeScript, they better be really good at JavaScript. Because TypeScript saves your ass. 
- [Done] I want them to know the 3 different kinds of software problems.
- [Done] I want them to know that Domain-Driven Design is the way to tackle complexity on the backend.
- Know if they need TypeScript on the front end in their app.
- Know if they need TypeScript on the backend in their app.

Step 3: Brainstorm a few possible titles
- When Is TypeScript Absolutely Necessary?
- When Is It Vital To Be Using TypeScript?
- When Should I Be Using TypeScript?
- When Is It Dangerous To Not Use TypeScript?
- How To Identify When It's Vital To Be Using TypeScript
- How To Identify When It's Dangerous To Not Be Using TypeScript

Step 4: Create an outline
- Introduction: Set the stage for what you're going to teach them how to do.

Body: explain every step involved to learning how to do that thing
- Conclusion: Wraps up the post with a brief statement that's reflective of what your readers just learned.

Step 5: Write the Intro
- Make sure to establish credibility and empathize with my audience.
- Tell the story about how I started running into a lot of bugs and it felt like everything was broken all the time. Also tell how it was hard to create good designs.


