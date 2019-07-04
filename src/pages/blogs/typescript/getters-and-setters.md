---
templateKey: blog-post
title: "TypeScript & JavaScript Getters and Setters: Are they useless?"
date: '2019-07-01T10:04:10-05:00'
updated: '2019-07-201T10:04:10-05:00'
description: >-
  In this blog post, we talk about the utility of getters and setters in modern web development. Are they useless? When does it make sense to use them?
tags:
  - Interfaces
  - TypeScript
  - Software Design
category: TypeScript
published: true
image: /img/blog/templates/banners/typescript-blog-banner.png
---

Join the discussions on [Hackernews](https://news.ycombinator.com/item?id=20357313) and [Reddit](https://www.reddit.com/r/javascript/comments/c970dd/typescript_javascript_getters_and_setters_are/).

---

Getters and setters (also known as accessors) were introduced to JavaScript when ECMAScript 5 (2009) was released. 

The thing is, there's a lot of confusion about their utility and why you would ever even want to use them.

I came across this [reddit thread](https://www.reddit.com/r/typescript/comments/87t1h7/are_getters_and_setters_an_antipattern/) where the discussion was about if they were an anti-pattern. 

Unfortunately, the general consensus of the thread was "yes". I think that's because the majority of your front-end programming on a daily basis doesn't call for the utility that getters and setters offer.

Though I disagree with getters and setters being an anti-pattern _overall_. They have a lot of utility in several different cases.  

## What are they _for_?

Getters and setters are another way for you to provide access to the properties of an object.

Trivial usage might look like this:

```typescript
interface ITrackProps {
  name: string;
  artist: string;
}

class Track {  
  private props: ITrackProps;

  get name (): string {
    return this.props.name;
  }

  set name (name: string) {
	  this.props.name = name;
  }

  get artist (): string {
    return this.props.artist;
  }

  set artist (artist: string) {
	  this.props.artist = artist;
  }

  constructor (props: ITrackProps) {
    this.props = props;
  } 

  public play (): void {	
	  console.log(`Playing ${this.name} by ${this.artist}`);
  }
}
```

The question becomes: "why not just use regular class attributes?"

Well, in this case, _we could_.

```typescript
interface ITrackProps {
  name: string;
  artist: string;
}

class Track {  
  public name: string;
  public artist: string;

  constructor (name: string, artist: string;) {
    this.name = name;
    this.artist = artist;
  } 

  public play (): void {	
	  console.log(`Playing ${this.name} by ${this.artist}`);
  }
}
```

That's much simpler. And that's also a really simple use case. Let's look at scenarios that better describe why we might care about using getters and settters vs regular class attributes.

## Preventing Anemic Domain models

Do you remember what an [anemic domain model](/wiki/anemic-domain-model/) is? One of the earliest ways to sniff out an anemic domain model is if there are getters and setters for **every single attribute** of your domain entities (ie: _set_ operations that don't make sense to the domain-specific language are exposed). 

And if you don't explicitly use the `get` or `set` keywords, making everything `public` also has the same negative effect.

Consider this example:

```javascript
class User {
  // Bad. You can now `set` the user id.
  // When would you ever need to mutate a user's id to a
  // different identifier? Is that safe? Should you be able to?
  public id: UserId;

  constuctor (id: UserId) {
    this.id = id;
  }
}
```

In Domain-Driven Design, to prevent an anemic domain model and push forward the creation of a domain-specific language it's <u>really</u> important for us to _only expose operations that are valid to the domain_.

That means [understanding the domain that you're working in](/articles/solid-principles/single-responsibility/).

I'll put myself up for scrutiny. Let's take a look at the `Vinyl` class from [White Label](https://github.com/stemmlerjs/white-label), an open-source vinyl-trading app built with TypeScript using Domain-Driven Design.

```typescript
import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Result } from "../../core/Result";
import { Artist } from "./artist";
import { Genre } from "./genre";
import { TraderId } from "../../trading/domain/traderId";
import { Guard } from "../../core/Guard";
import { VinylCreatedEvent } from "./events/vinylCreatedEvent";
import { VinylId } from "./vinylId";

interface VinylProps {
  traderId: TraderId;
  title: string;
  artist: Artist;
  genres: Genre[];
  dateAdded?: Date;
}

export type VinylCollection = Vinyl[];

export class Vinyl extends AggregateRoot<VinylProps> {

  public static MAX_NUMBER_GENRES_PER_VINYL = 3;

  // 🔥 1. Facade. The VinylId key doesn't actually exist
  // as a property of VinylProps, yet- we still need
  // to provide access to it.

  get vinylId(): VinylId {
    return VinylId.create(this.id)
  }

  get title (): string {
    return this.props.title;
  }

  // 🔥 2. All of these properties are nested one layer
  // deep as props so that we can control access 
  // and mutations to the ACTUAL values.

  get artist (): Artist {
    return this.props.artist
  }

  get genres (): Genre[] {
    return this.props.genres;
  }

  get dateAdded (): Date {
    return this.props.dateAdded;
  }

  // 🔥 3. You'll notice that there are no setters so far because 
  // it doesn't make sense for us to be able to change any of these
  // things after it has been created

  get traderId (): TraderId {
    return this.props.traderId;
  }

  // 🔥 4. This approach is called "Encapsulate Collection". We
  // will need to add genres, yes. But we still don't expose the
  // setter because there's some invariant logic here that we want to
  // ensure is enforced.
  // Invariants: 
  // https://khalilstemmler.com/wiki/invariant/

  public addGenre (genre: Genre): void {
    const maxLengthExceeded = this.props.genres
      .length >= Vinyl.MAX_NUMBER_GENRES_PER_VINYL;

    const alreadyAdded = this.props.genres
      .find((g) => g.id.equals(genre.id));

    if (!alreadyAdded && !maxLengthExceeded) {
      this.props.genres.push(genre);
    }
  }

  // 🔥 5. Provide a way to remove as well.

  public removeGenre (genre: Genre): void {
    this.props.genres = this.props.genres
      .filter((g) => !g.id.equals(genre.id));
  }

  private constructor (props: VinylProps, id?: UniqueEntityID) {
    super(props, id);
  }

  // 🔥 6. This is how we create Vinyl. After it's created, all properties 
  // effectively become "read only", except for Genre because that's all that
  // makes sense to enabled to be mutated.

  public static create (props: VinylProps, id?: UniqueEntityID): Result<Vinyl> {
    const propsResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.title, argumentName: 'title' },
      { argument: props.artist, argumentName: 'artist' },
      { argument: props.genres, argumentName: 'genres' },
      { argument: props.traderId, argumentName: 'traderId' }
    ]);

    if (!propsResult.succeeded) {
      return Result.fail<Vinyl>(propsResult.message)
    } 

    const vinyl = new Vinyl({
      ...props,
      dateAdded: props.dateAdded ? props.dateAdded : new Date(),
      genres: Array.isArray(props.genres) ? props.genres : [],
    }, id);
    const isNewlyCreated = !!id === false;

    if (isNewlyCreated) {
      // 🔥 7. This is why we need VinylId. To provide the identifier
      // for any subscribers to this domain event.
      vinyl.addDomainEvent(new VinylCreatedEvent(vinyl.vinylId))
    }

    return Result.ok<Vinyl>(vinyl);
  }
}
```

Acting as a facade, maintaining readonly values, enforcing model expressiveness, encapsulating collections, AND [creating domain events](/blogs/domain-driven-design/where-do-domain-events-get-dispatched/) are some very solid use cases for getters and setters in [Domain-Driven Design](/articles/domain-driven-design-intro/).

## Change detection in Vue.js

[Vue.js](https://vuejs.org/v2/guide/reactivity.html), one of the newer front-end frameworks, prides itself with being very fast and reactive.

The reason why Vue.js does change detection so efficiently is because they use the `Object.defineProperty()` [API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) to _watch_ for changes to your View Models!

From the Vue.js docs on Reactivity,

> When you pass a plain JavaScript object to a Vue instance as its data option, Vue will walk through all of its properties and convert them to getter/setters using Object.defineProperty. The getter/setters are invisible to the user, but under the hood they enable Vue to perform dependency-tracking and change-notification when properties are accessed or modified. - [Vue.js Docs: Reactivity](https://vuejs.org/v2/guide/reactivity.html)

---

In conclusion, getters and setters _do_ have a lot of utility for a lot of different problems. Those problems just don't occur a whole lot in modern front-end web development.