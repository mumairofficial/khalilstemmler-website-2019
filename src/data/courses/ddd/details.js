import React from 'react'
import icon from '../../../images/courses/ddd/icon.svg'
import banner from '../../../images/courses/ddd/course-banner.png'
import lifecycleImage from '../../../../static/img/blog/ddd-intro/ddd-diagram.svg'
import events from '../../../../static/img/blog/ddd-intro/events.svg'


const courseData = {
  id: 'ddd-course',
  title: `Domain-Driven Design w/ TypeScript & Node.js`,
  description: <span>Learn how to use Domain-Driven Design to build complex <u>enterprise-level</u> applications with Node.js & TypeScript.</span>,
  slug: 'domain-driven-design-typescript',
  icon: icon,
  banner: banner,
  keywords: ['domain driven design', 'nodejs', 'typescript'],
  videoUrl: "https://khalilstemmler.wistia.com/medias/b18q6825k0",
  sections: {
    mainDescription: (
      <>
        <h2>Ever wonder how huge complex apps are built? </h2>
        <p>Think <u>business-logic heavy</u> apps and organizations like Google, Microsoft and GitHub. </p>
        <p>How do <i>they</i> do it?</p>
        <br/>
        <h2>Have you ever found yourself wondering:</h2>
        <ul>
          <li>Why is it that the more code I add to this project, the harder it becomes to maintain?</li>
          <li>Where do I put business logic anyways?</li>
          <li>Where do I put validation logic? </li>
          <li>Does this design make sense?</li>
          <li>How can I make this code cleaner?</li>
          <li>How are real-life companies doing this?</li>
          <li>How are senior developers writing code?</li>
          <li>How do I write tests for this code?</li>
          <li>and the list goes on...</li>
        </ul>
      </>
    ),
    projectDescription: (
      <>
        <p>We’ll build a <u>Vinyl Trading Application</u> complete with Billing, Notifications, Users & Identity 
Management supporting subdomains using DDD best practices.</p>
        <p>We’ll use Node.js, Express.js, Sequelize ORM, Stripe and JWT for authentication.</p>
        <div className="ddd-project-image-container">
          <div className="image">
            <img src={lifecycleImage}/>
          </div>
          <div className="image">
            <img src={events}/>
          </div>
        </div>
      </>
    ),
    learningBenefits: [
      <span>How to build complex applications with 
      Node.js and TypeScript that <i>actually</i> get 
      better instead of degrading over time</span>,
      `How to organize your application into 
      subdomains and separate bounded 
      contexts`,
      `How to design rich object-oriented 
      software implementations of the 
      problem domain`,
      `How to discover & organize business 
      logic using Domain Events and Event Storming`,
      `How to encapsulate business rules
      and validation logic in Entities and 
      Value Objects using factories`,
      `How to use Separation of Concerns 
      to organize your app into testable layers`
    ],
    outline: [
      { 
        module: 'Introduction to Domain-Driven Design',
        items: [
          'Getting started',
          'Why Domain-Driven Design?',
          'Why TypeScript?',
          'What projects are right for Domain-Driven Design?',
          'The main concepts of Domain-Driven Design',
          'Layered Architecture and an isolated Domain model',
          'TDD and Unit Testing',
          'Model-Driven Design',
          'What are we building?',
          'Summary'
        ]
      },
      { 
        module: 'Understanding the problem, subdomains and bounded contexts',
        items: [
          'Goals of modeling a problem domain to a solution space',
          'Separating the solution space in subdomains',
          'Identifying the primary domain',
          'Supporting & generic subdomains',
          'Bounded contexts & subdomains',
          'Involving Domain Experts to build a Ubiquitous Language',
          'Summary'
        ]
      },
      { 
        module: 'Getting started with Domain Modeling',
        items: [
          'The goals of modeling our domain',
          'Domain modeling building blocks',
          'Rich vs. Anemic Domain Models',
          'TypeScript, Express.js and Sequelize project setup',
          'Entities',
          'The lifecycle of an Entity',
          'Base Entity class',
          'Generating Entity identity strategies',
          'Creating entities using Factory Methods',
          'TDD approach to identifying modeling our requirements',
          'When to write Unit Tests',
          "Don't follow the Red-green-refactor loop to a tee",
          'Value Objects',
          'Difference between Entities and Value Objects',
          'Base Value Object class',
          'Encapsulating validation logic in Value Objects',
          'Summary'
        ]
      },
      { 
        module: 'Persistence & UI Layers',
        items: [
          'Goals of the persistence layer separation of concerns',
          'Recap of the Onion architecture',
          'Designing a database schema for our application',
          'Introducing the Sequelize ORM',
          'Hooking up ORM models and migration scripts',
          'Entity identity generation with UUIDs instead of auto-incremented primary keys',
          'Introducing Repositories',
          'To use generic repositories or not',
          'Using Repositories to perform CRUD on domain models',
          'Using Mappers to map ORM models to Domain Models',
          'Using Mappers to map Domain Models to ORM models',
          'DTOs for our API layer',
          'Using Mappers to map Domain Models to DTOs',
          'Other patterns: Unit of Work, transactions, repo.save()',
          'Summary'
        ]
      },
      { 
        module: 'Aggregates & Domain Events',
        items: [
          'Understanding the role of Aggregates',
          'Identifying an Aggregate',
          'Base Aggregate class',
          'Understanding how Domain Events allow us to co-locate domain logic',
          'Domain Events using the Publish/subscribe pattern',
          'Event storming to identify our domain events',
          'Creating our first Domain Events',
          'When to use domain services',
          'Subscribing to Domain Events (same subdomain, same bounded context)',
          'Subscribing to Domain Events (separate subdomain, same bounded context)',
          'Subscribing to Domain Events (separate subdomain, separate bounded context)',
          'Messaging Queues',
          'Anti-corruption layers',
          'Summary'
        ]
      },
      { 
        module: 'Additional bounded contexts and onwards',
        items: [
          'Goals of the separate bounded context',
          'Context maps and boundaries',
          'Communication between separate bounded contexts',
          'Application Services',
          'To use the Use Case pattern or not',
          'The role of the UI',
          'Splitting bounded contexts in microservices',
          'Packaging by module',
          'Domain modeling improvements',
          'DDD anti-patterns',
          'Summary'
        ]
      }
    ],
    guarantee: `Throughout the Domain-Driven Design w/ TypeScript course, you'll learn everything you need to design and develop complex business-logic heavy applications with Node.js & TypeScript.`
  }
}

export default courseData;