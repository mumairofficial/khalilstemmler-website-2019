---
name: Anemic Domain Model
templateKey: wiki
published: true
wikicategory: Domain-Driven Design
wikitags: null
prerequisites: null
date: '2019-04-09T00:05:26-04:00'
updated: '2019-04-09T00:05:26-04:00'
image: null
plaindescription: A domain model where the classes that describe the model and the classes that perform operations on the model are separate.
---

A lot of projects start out like this if you're not familiar with domain modeling. 

Anemic Domain Models are largely the cause of a lack of encapsulation and isolation within the domain models.

Watch what happens to the validation logic when we have a `CreateUserUseCase` and an `EditUserUseCase`. 

```typescript

class CreateUserUseCase extends BaseUseCase<ICreateUserRequestDTO, ICreateUserResponseDTO> {
  constructor () {
    super();
  }

  exec (request: ICreateUserRequestDTO): ICreateUserResponseDTO {
    const { name, email } = request.user;
    const isValidName = UserValidator.validateName(name);
    const isValidEmail = UserValidator.validateEmail(email);
    if (isValidName && isValidEmail) {
      const user: User = User.create(name, email);
      // continue
    } else {
      // error
    }
  }
}

class EditUserUseCase extends BaseUseCase<IEditUserRequestDTO, IEditUserResponseDTO> {
  constructor () {
    super();
  }

  exec (request: IEditUserRequestDTO): IEditUserResponseDTO {
    const { name, email } = request.user;
    const isValidName = UserValidator.validateName(name);
    const isValidEmail = UserValidator.validateEmail(email);
    if (isValidName && isValidEmail) {
      const user: User = User.create(name, email);
      // continue
    } else {
      // error
    }
  }
}

```

Does that look very DRY to you?

We have to write the User validation logic on the user input from the API twice, repeating it in both controllers.

While it might not seem like a big deal, this can spin out of control as we add `n` number of controllers that operate on the `User` model. We'll always be performing that validation logic to ensure we're working with a valid `user` instance.

The idea here is to encapsulate the invariants/domain logic close to the actual models themselves, so in this example, within the `User.create()` factory function.

***

Aside: It turns out that Anemic Domain Modeling is actually really useful for functional programming for a few reasons. 

1. In functional programming, objects are immutable. This means that there's no way for invariants to become unsatisfied. In this case, having a clear separation of the model and the services makes a lot of sense.

It also turns out that [ECS (Entity component system)](https://en.wikipedia.org/wiki/Entity_component_system), a pattern that's popular in game development, follows the rule of composition over inheritance whereby the operations that occur on models are usually located separately from the models, in services.

This makes sense and saves a lot of time if you want to add `CanRun` and `CanFly` in addition to `CanShootLazers` to various models in a game engine.

**Edit: I'm working on this page still!**