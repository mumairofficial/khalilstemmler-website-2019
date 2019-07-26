---
templateKey: article
title: "Handling Collections in Aggregates (0-to-Many, Many-to-Many) - Domain-Driven Design w/ TypeScript"
date: '2019-07-25T10:04:10-06:00'
updated: '2019-07-25T10:04:10-06:00'
description: >-
  In this article, we discuss how we can use a few CQS principles to handle unbounded 0-to-many or many-to-many collections in aggregates when designing web applications for performance. 
tags:
  - DDD
  - TypeScript
  - Software Design
  - Aggregate
  - One-to-many
  - Many-to-many
category: Domain-Driven Design
image: /img/blog/templates/banners/ddd-blog-banner.png
published: true
---

The [aggregate design](/articles/typescript-domain-driven-design/aggregate-design-persistence/) article I wrote was definitely my most in-depth article yet. And that's because it's such a big topic.

In response to the article, I was asked a really good question about **performance on collections**. Check it out:

<p class="special-quote">
"I would like ask a question regarding the Artist-Genres (1-m) relationship. <br/><br/>In your example you limit the number of Genres an artist can have, but what do you if there is no such limit?<br/><br/>
Do you load all related Genres when initializing a new Artist entity? 
<br/><br/>
Let's say there is a Post-Comment (1-m) relation where a Post can have hundreds or even thousands of Comments. When you have a getPost useCase, do you also load all Comments?"
<br/><br/>
How do we handle when a collection will grow out of scope?"
</p>

Really good question and a valid concern. Let's get into it.

---

Let's visualize the `Post` and `Comment` classes.

```typescript

interface PostProps {
  // WatchedList is a custom utility I made that 
  // encapsulates a collection/array. It's able to
  // tell when items are initial vs. newly added.
  comments: WatchedList<Comment>;
}

export class Post extends AggregateRoot<PostProps> {
  
  get comments (): Comment[] {
    return this.props.comments.currentItems();
  }

  private constructor (props: PostProps, id?: UniqueEntityID) {
    super(props, id);
  }
  ...
}
```

So by this design, there are actually 0-to-many `Comments` for a `Post` with no domain logic restricting an upper bound.

If everytime we want to _perform an operation on a post_, we have to retrieve every `Comment` for it, our system simply won't scale.

How do we remedy this?

## CQS (Command Query Segregation)

When we first start learning about DDD, we often run into terms like CQS, CQRS and Event Sourcing.

These topics can explode into complexity for developers just getting started with DDD,  so I'm going to attempt to keep it as pragmatic as possible for relatively simple DDD projects (that might be contradictory - DDD is needed when our projects are complex 🤪).

Here's what's important for you to know now: CQS (command query segregation).

[Fowler's](https://martinfowler.com/bliki/CommandQuerySeparation.html) explanation is  that "we should divide an object's methods into two sharply separated categories:"

- Queries: Return a result and do not change the observable state of the system (are free of side effects).
- Commands: Change the state of a system but do not return a value.

Let's talk about commands first.

### Commands

If we think about how we design our web applications, this is pretty much how we think of things when we do `CRUD`. 

With respect to things that web developers are concerned about, here are some **command-like** equivalent terms:

- CRUD: `Create`, `Update`, `Delete`
- HTTP REST Methods: `POST`, `PUT`, `DELETE`, `PATCH`
- Our `Blog` subdomain use cases: `CreatePost`, `UpdatePost`, `DeletePost`, `PostComment`, `UpdateComment`

These are **writes**. Writes make changes to the system in some way.

To illustrate, let's build the `PostComment` use case.

### PostComment Use Case - Command

```typescript
interface PostCommentRequestDTO {
  userId: string;
  postId: string;
  html: string;
}

export class PostCommentUseCase extends UseCase<PostCommentRequestDTO, Promise<Result<any>>> {
  private postRepo: IPostRepo;

  constructor (postRepo: IPostRepo) {
    this.postRepo = postRepo;
  }

  public async execute (request: PostCommentRequestDTO): Promise<Result<any>> {
    const { userId, postId, html } = request;

    try {
      // Retrive the post
      const post: Post = await this.postRepo.findPostByPostId(postId);

      // Create a comment
      const commentOrError: Result<Comment> = Comment.create({ 
        postId: post.postId, 
        userId: UserId.create(userId),
        html
      });

      if (commentOrError.isFailure) {
        return Result.fail<any>(commentOrError.error);
      }
      // Get the comment from the result
      const comment: Comment = commentOrError.getValue();

      // Add a comment
      // => This adds the comment to the post's watched list
      post.addComment(comment);

      ...

    } catch (err) {
      console.log(err);
      return Result.fail<any>(err);
    }
  }
}
```

And `addComment(comment: Comment): void` from within `Post`.

```typescript

interface PostProps {
  comments: WatchedList<Comment>;
}

export class Post extends AggregateRoot<PostProps> {
  
  get comments (): Comment[] {
    return this.props.comments.currentItems();
  }

  public addComment (comment: Comment): void {
    // Adds to comments: WatchedList<Comment>.newItems()
    this.comments.add(comment);
  }

  private constructor (props: PostProps, id?: UniqueEntityID) {
    super(props, id);
  }
  ...
}
```

In the code above,  we've created a `PostCommentUseCase` where we retrieve the `Post`  domain entity from the repo, and **utilized the `Post` domain** model to post a comment with `post.addComment(comment)`.

Let's stop right there for a sec...

> When we retrieved the `Post` domain model, did we also retrieve all (possibly hundreds of) comments? 

No.

Why not?

Well, we _could_ set a `limit` on the number of `Comments` we return initially from our repo.

For example, our `baseQuery()` method in the `PostRepo` could look like this:

```typescript
export class PostRepo implements IPostRepo {
  private createBaseQuery (): any {
    const models = this;
    return {
      where: {},
      include: [
        { 
          model: models.Comment, 
          as: 'Comment', 
          limit: 5, 
          order: ['date_posted', 'DESC']
        }
      ]
    }
  }

  ..
}
```

This would have the effect of returning the **5 most recent comments**.

But don't we have to return all of the `Comments` in this `Post`? Doesn't that ruin our `Post` domain model? 

No, it doesn't. 

My question is, for this `PostCommentUseCase` (which we've identified as a `COMMAND`), did we _need_ to have all the comments in order to execute it?

Is there some invariant that we need to enforce here on the comments in the list to post a new comment? 

In the [previous article](/articles/typescript-domain-driven-design/aggregate-design-persistence/), we looked at the fact that:

> ...an "aggregate" is a cluster of associated objects that we treat as a unit for the purpose of data changes." - Evans. 126

And in Vaughn Vernon's book, he says that:

> ...“When trying to discover the Aggregates, we must understand the model’s true invariants. Only with that knowledge can we determine which objects should be clustered into a given Aggregate. An invariant is a business rule that must always be consistent.” - Excerpt From: Vernon, Vaughn. “Implementing Domain-Driven Design.” 

Emphasis on **true invariants**. Understand that there _aren't any reasons_ for us to need to have all of child `Posts` in order to execute this `COMMAND`.

Unless there was a rule to limit the **total number of comments allowed** to have been posted, and unlike my `Genres` example in the previous article, if the upper bound was much higher (say, 6000), then we might consider making `totalComments: number` a required member of the `Post` entity upon retrieval from the `PostRepo`.

A `COUNT(*) WHERE post_id = "$"` would be much more efficient than having to retrive and reconsistute 6000 comments in memory _in order to post_ a `comment`.

---

So let’s continue, I just pulled in `Post` and did `post.addComment(comment)`. Next, we'll save it to the repo.

```typescript
export class PostCommentUseCase extends UseCase<PostCommentRequestDTO, Promise<Result<any>>> {
  ... 
  public async execute (request: PostCommentRequestDTO): Promise<Result<any>> {
    const { userId, postId, html } = request;

    try {
      ...
      post.addComment(comment);

      // save the post, cascading the save the
      // any commentsRepos as well for new comments
      await this.postRepo.save(post);

      return Result.ok<any>()

    } catch (err) {
      console.log(err);
      return Result.fail<any>(err);
    }
  }
}
```

When I do `postRepo.save(post)`, it’ll pass any new `comments` in the `Post` model to the `commentRepo` and save them like we did [last time](/articles/typescript-domain-driven-design/aggregate-design-persistence/).

Nice.

Let’s flip it around to some `READ`s now.

### Reads

Let's say that I'm working on creating the API call to return the `Post` as a resource.

#### Getting a Post by Id

The API call might look like this:

- GET `/post/:id`

And the `GetPostByIdUseCase` simply retrives that post.

```typescript
interface GetPostByIdRequestDTO {
  postId: string;
}

interface GetPostByIdResponseDTO {
  post: Post;
}

export class GetPostByIdUseCase extends UseCase<GetPostByIdRequestDTO, Promise<Result<GetPostByIdResponseDTO>>> {
  private postRepo: IPostRepo;

  constructor (postRepo: IPostRepo) {
    this.postRepo = postRepo;
  }

  public async execute (request: GetPostByIdRequestDTO): Promise<Result<any>> {
    const { postId } = request;

    try {
      // Retrive the post
      const post: Post = await this.postRepo.findPostByPostId(postId);

      // Return it
      return Result.ok<GetPostByIdResponseDTO>(post);
    } catch (err) {
      console.log(err);
      return Result.fail<any>(err);
    }
  }
}
```

And the `PostRepo` only returns the 5 most recent `Comments` in the post **by default**.

```typescript
export class PostRepo implements IPostRepo {
  private createBaseQuery (): any {
    const models = this;
    return {
      where: {},
      include: [
        { 
          model: models.Comment, 
          as: 'Comment', 
          limit: 5, 
          order: ['date_posted', 'DESC']
        }
      ]
    }
  }

  public async findPostByPostId (postId: PostId | string): Promise<Post> {
    const PostModel = this.models.Post;
    const query = this.createBaseQuery();
    query.where['post_id'] = (
      postId instanceof PostId ? (<PostId>postId).id.toValue() : postId
    );
    const post = await PostModel.findOne(query);
    if (!!post) return PostMap.toDomain(post);
    return null;
  }
}
```
That should be enough for the first call. And you could even tune that if you like.

What about retrieving the rest of the resource? Namely, the `Comments`. 

### Getting a Post Comments By Post Id

Assume I'm reading the post via the UI and I start to scroll down. What happens if this post has over 1000 comments. What do we do now?

If we had some slick fetch-on-scroll functionality, we could make some async API calls on-scroll.

To fetch more comments, the API call might look like:

- GET /post/:id/comments?offset=5

We could create a `GetCommentsByPostId` use case.

```typescript
interface GetCommentsByPostIdRequestDTO {
  postId: string;
  offset: number;
}

interface GetCommentsByIdResponseDTO {
  comments: Comment[];
}

export class GetCommentsByPostIdUseCase extends UseCase<GetCommentsByPostIdRequestDTO, Promise<Result<GetCommentsByIdResponseDTO>>> {

  private commentsRepo: ICommentsRepo;

  constructor (commentsRepo: ICommentsRepo) {
    this.commentsRepo = commentsRepo;
  }

  public async execute (request: GetCommentsByPostIdRequestDTO): Promise<Result<any>> {
    const { postId, offset } = request;

    try {
      // Retrive the comments
      const comments: Comment[] = await this.commentsRepo.findCommentsByPostId(postId, offset);

      // Return it
      return Result.ok<GetPostByIdResponseDTO>({
        comments
      });

    } catch (err) {
      console.log(err);
      return Result.fail<any>(err);
    }
  }
}
```

```typescript
export class CommentsRepo implements ICommentsRepo {
  private createBaseQuery (): any {
    const models = this;
    return {
      where: {},
      limit: 5
    }
  }

  public async findCommentsByPostId (postId: PostId | string, offset?: number): Promise<Comment[]> {
    const CommentModel = this.models.Comment;
    const query = this.createBaseQuery();
    query.where['post_id'] = (
      postId instanceof PostId ? (<PostId>postId).id.toValue() : postId
    );
    query.offset = offset ? offset : 0;
    const comments = await CommentModel.findAll(query);
    return comments.map((c) => CommentMap.toDomain(c));
  }
}
```

While we still use our reference to the `post` through `postId`, we go straight to the `comments` repository to get what we need for this query.

### Forum conversation about leaving out the Aggregate for querying

From [StackExchange](https://softwareengineering.stackexchange.com/questions/47488/are-ddd-aggregates-really-a-good-idea-in-a-web-application),

"Don't use your Domain Model and aggregates for querying.

In fact, what you are asking is a common enough question that a set of principles and patterns has been established to avoid just that. It is called CQRS."

"I can't imagine that anyone would advocate returning entire aggregates of information when you don't need it." I'm trying to say that you are exactly correct with this statement. Do not retrieve an entire aggregate of information when you do not need it. This is the very core of CQRS applied to DDD. You don't need an aggregate to query. Get the data through a different mechanism (a repo works nicely), and then do that consistently."

### Takeaway

- If there's a invariant / business rule that needs to be protected by returning all of the elements in an associated collection under an aggregate boundary, return them all (like the case with `Genres`).
- If there's **no underlying invariant / business rule to protect** by returning all unbounded elements in an associated collection under an aggregate boundary, don't bother returning them all for `COMMANDS`.
- Execute `QUERY`s directly against the repos (or consider looking into how to build Read Models). 

#### Additional reading

- https://softwareengineering.stackexchange.com/questions/47488/are-ddd-aggregates-really-a-good-idea-in-a-web-application
- https://web.archive.org/web/20150118024058/http://cre8ivethought.com/blog/2009/11/12/cqrs--la-greg-young
- “Rule: Model True Invariants in Consistency Boundaries” (Vaughn  Vernon, Chapter 10 Aggregates)
- https://www.dotnetcurry.com/patterns-practices/1461/command-query-separation-cqs