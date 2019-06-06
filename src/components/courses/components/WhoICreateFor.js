import React from 'react'
import "../styles/WhoICreateFor.sass"

const reasons = [
  `Junior & intermediate-level developers technically adept in at least one programming  language, hungry for 
  advanced-level content on how to build complex enterprise-level applications.`,
  `Junior & intermediate-level developers who want to fast-track their way to senior level roles.`,
  `Developers who want to improve their object-modeling and software design capabilities. `,
  `Developers who want to know how to design any system using Object-oriented programming principles and software design.`,
  `Developers who want to learn principles and best practices towards creating stable and maintainable, 
  yet flexible applications with Node.js.`,
  `Mid-level to Sr level back-end developers coming from a different language (like C# or Java) 
  and curious to learn how applications can be built using common software development approaches 
  like Domain-Driven Design, but with JavaScript technologies.`,
  `Bootcamp graduates who are comfortable in the fundementals of JavaScript and want to learn software design best practices.`,
  `Freelancers & consultants who want to learn how best practices and how to scope real life software projects for clients. `
]

const WhoICreateFor = () => (
  <div className="who-i-create-for">
    <div className="inner">
      <h2>Who I create courses for</h2>
      {reasons.map((reason, i) => (
        <p key={i}>{reason}</p>
      ))}
    </div>
  </div>
)

export default WhoICreateFor;