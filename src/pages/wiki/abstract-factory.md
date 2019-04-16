---
name: Abstract Factory
templateKey: wiki
published: true
wikicategory: Design Patterns
wikitags: null
prerequisites: null
date: '2019-04-09T00:05:26-04:00'
updated: '2019-04-16T00:05:26-04:00'
image: null
plaindescription: The abstract factory pattern provides a way to encapsulate a group of individual factories that have a common theme without specifying their concrete classes.
---

Here's a really silly example. If you don't like it, well- damn. [If you do, tell me about it](https://twitter.com/stemmlerjs).

## Pokemon Example w/ TypeScript

Let's say you want to be able to **create any type of Pokemon**.

I know that's a bold ask especially since there's new Pokemon getting added and created **all the time**. 

While that is true, if we wanted to do this, we'd need to start somewhere. 

So let's define the `Pokemon` abstraction.

### Pokemon abstract class
#### All Pokemon must extend this abstract class

```typescript
interface IPokemonProps {
  name: string;
  color: string;
}

abstract class Pokemon implements IPokemonProps {
  public name: string;
  public color: string;

  constructor (props: IPokemonProps) {
    this.name = props.name;
    this.color = props.color;
  }

  abstract attack (): IAttack;
}
```

Every pokemon must have a `name` and a `color` and the [concrete](/wiki/concrete-class) pokemon class must implement the abstract `attack` method. Different pokemon have different attacks, right? That's why it's abstract. The subclass will define it.

OK, let's create our first Pokemon. So let's start with Pikachu. 

How do we create a Pikachu?

### Our first Factory, a Pikachu Factory

I'm not sure if it was ever really discussed in the show how Pokemon are actually created...

Hypothetically, let's say that if we wanted to create a Pikachu, we'd need to do the following:

- get a bunch of batteries
- get some tape
- get some paint
- get a cat
- tape the batteries to the back of a cat

_Use your imagination here, OK?_

Since there's obviously a process involved in creating this particular Pokemon, let's put this into an abstraction, a factory.

```typescript

class Pikachu extends Pokemon {
  private cat: TapedItem<Battery[], Cat>;

  constructor (cat: TapedItem<Battery[], Cat>) {
    super({ name: 'Pikachu', color: 'yellow' });
    this.cat = cat;
  }

  attack () : ZapAttack {
    return this.cat.zapAttack();
  }
}

class PikachuFactory {
  public static create (): Pikachu {
    const batteries: Battery[] = [
      new Battery(),
      new Battery()
    ];
    const paint: Paint = new Paint('yellow');
    const tape: Tape = new Tape();
    const cat: Cat = new Cat();

    const paintedCat: PaintedItem<Cat> = Paint.paintItem(cat, paint);

    const catTapedByBatteries: TapedItem<Battery[], Cat> = Tape
      .combineItems(batteries, paintedCat);

    return new Pikachu(catTapedByBatteries);
  }
}

```

OK awesome, we have a way to create Pikachus.

We can do that like this.

```typescript
const pikachu: Pikachu = PikachuFactory.create();
```

And we've encapsulated all of the complex Pikachu-creation logic inside of a Factory.

Woo!

### More Pokemon Factories

Now let's say that we wanted to create a Charmander factory, a Bulbasaur factory and a Porygon factory. And each of them would also have equally creative and complex ways to create them, encapsulated inside of some type of Pokemon Factory.

And we wanted to be able to create them all of them like this:

```typescript
const charmander: Charmander = CharmanderFactory.create();
const bulbasaur: Bulbasaur = BulbasaurFactory.create();
const porygon: Porygon = PorygonFactory.create();
```

And more!

_As much fun as it would be to create more Pokemon Factories, I'm going to have to assume you get the idea._

*** 

At this point, I will finally be able to present to you the usefulness of an **Abstract Factory**.

Ideally, we would want to encapsulate Pokemon creation somehow. 

By definition:

> The abstract factory pattern provides a way to encapsulate a group of individual factories that have a common theme without specifying their concrete classes.

That definition probably makes a little bit more sense now given the context.

Instead of needing to create a **hard source code dependency** by importing the type of Pokemon that we want like this:

```typescript
import { Charmander } from 'pokemon/charmander'
import { CharmanderFactory } from 'pokemon/charmander/factory'
import { Bulbasaur } from 'pokemon/bulbasaur'
import { BulbasaurFactory } from 'pokemon/bulbasaur/factory'
import { Porygon } from 'pokemon/porygon'
import { PorygonFactory } from 'pokemon/porygon/factory'

const charmander: Charmander = CharmanderFactory.create();
const bulbasaur: Bulbasaur   = BulbasaurFactory.create();
const porygon: Porygon       = PorygonFactory.create();
```

We can call upon an `abstract` `PokemonFactory` like this:

```typescript
import { PokemonFactory, PokemonType } from 'pokemon/factory'
import { Charmander } from 'pokemon/charmander'
import { Bulbasaur } from 'pokemon/bulbasaur'
import { Porygon } from 'pokemon/porygon'

const charmander: Charmander = PokemonFactory.create(PokemonType.CHARMANDER);
const bulbasaur: Bulbasaur   = PokemonFactory.create(PokemonType.BULBASAUR);
const porygon: Porygon       = PokemonFactory.create(PokemonType.PORYGON);
```

Where the PokemonFactory looks like:

```typescript
import { CharmanderFactory } from 'pokemon/charmander/factory'
import { BulbasaurFactory } from 'pokemon/bulbasaur/factory'
import { PorygonFactory } from 'pokemon/porygon/factory'

enum PokemonType {
  CHARMANDER = 'charmander',
  BULBASAUR = 'bulbasaur',
  PORYGON = 'porygon'
}

export class PokemonFactory {
  public static create(pokemonType: PokemonType): Pokemon {
    switch (pokemonType) {
      case PokemonType.CHARMANDER:
        return CharmanderFactory.create();
      case PokemonType.BULBASAUR:
        return BulbasaurFactory.create();
      case PokemonType.PORYGON:
        return PorygonFactory.create();
      default:
        return null;
    }
  }
}
```

## <i class="far fa-smile"></i> Why is it useful?

What we've done here is _abstracted how we create Pokemon_.

We've also delegated the **Single Responsibility** for Pokemon creation to one place.

When we have to add new Pokemon, we add a new `PokemonType`, create the new factory and add it to the end of this switch statement.



