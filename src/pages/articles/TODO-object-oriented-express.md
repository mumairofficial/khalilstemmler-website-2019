---
templateKey: blog-post
title: "Object-oriented Express.js: Creating a Base Controller"
date: '2019-05-08T10:04:10-05:00'
updated: '2019-05-08T10:04:10-05:00'
description: >-
  Humans like objects because objects are easy to understand. And I like understanding stuff.
tags:
  - Node.js
  - Software Design
  - TypeScript
category: Web Development
image: /img/blog/cleaner-errors/errors.jpeg
published: false
---

Object-oriented programming is such a beautiful thing. Not only does it help to reduce the amount of repeated code and repeated work, but it effectively describes the responsibility and relationships between software components in a way that everyone on your team can understand. Humans like objects because objects are easy to understand. And I like understanding stuff.

## BaseController

It's also a good idea to have a consistent API response format.
Most APIs that you see usually have this so that we know how to expect what's going to come back from the response.

```typescript
import * as express from 'express'

export abstract class BaseController {
  public static jsonResponse (res: express.Response, code: number, message: string) {
    return res.status(code).json({ message })
  }

  public ok<T> (res: express.Response, dto?: T) {
    if (!!dto) {
      return res.status(200).json(dto);
    } else {
      return res.sendStatus(200);
    }
  }

  public created (res: express.Response) {
    return res.sendStatus(201);
  }

  public clientError (res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, 400, message ? message : 'Unauthorized');
  }

  public unauthorized (res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, 401, message ? message : 'Unauthorized');
  }

  public paymentRequired (res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, 402, message ? message : 'Payment required');
  }

  public forbidden (res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, 403, message ? message : 'Forbidden');
  }

  public notFound (res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, 404, message ? message : 'Not found');
  }

  public conflict (res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, 409, message ? message : 'Conflict');
  }

  public tooMany (res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, 429, message ? message : 'Too many requests');
  }

  public fail (res: express.Response, error: Error | string) {
    return res.status(500).json({
      message: error.toString()
    })
  }
}
```