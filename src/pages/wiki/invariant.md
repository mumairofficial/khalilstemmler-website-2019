---
name: Class Invariant
templateKey: wiki
published: true
wikicategory: Domain-Driven Design
wikitags: 
  - object-oriented design
prerequisites: null
date: '2019-04-09T00:05:26-04:00'
updated: '2019-04-09T00:11:26-04:00'
image: null
plaindescription: Invariants are a form of ensuring data integrity of an object. 
---

By _data integrity_, we mean "what shape is this data allowed to take?”, “what methods can be called and at which point?", “what are the required parameters and pre-conditions in order to create this object”?

Methods need to preserve the invariants of an object. They need to constrain the state stored in the object such that it doesn't end up being invalid.

Here's an example using a Latitude class.

```typescript
import { ValueObject } from '../../../core/valueObject';
import { Result, TypedResult } from '../../../core/result';

export interface ILatitude {
  value: number;
}

export class Latitude extends ValueObject<ILatitude> {
  value: number;
  
  private constructor (props: ILatitude) {
    super(props);
    this.value = props.value
  }

  // Factory method
  // The latitude must be a number between -90 and 90
  public static create (latitude: ILatitude) : TypedResult<Latitude> {
    if (latitude.value < -90 || latitude.value > 90) {
      return Result.typedFail<Latitude>("Latitude must be within -90 and 90")
    }
    return Result.typedOk<Latitude>(new Latitude(latitude))
  }
}
```

In this example, in order to create a Latitude object, we need to satisfy the invariant of passing in a value between -90 and 90. 

Anything else is not a valid latitude.

***