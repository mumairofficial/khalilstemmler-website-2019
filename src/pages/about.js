import React from 'react'
import PropTypes from 'prop-types'
import Layout from "../components/shared/layout"
import aboutImage from '../images/about/about-img-2.jpg'

const AboutImage = () => (
  <img src={aboutImage}/>
)

const About = () => (
  <Layout 
    title="about"
    component={<div></div>}>

    <AboutImage/>

    <p>
      <b>Short:</b> I'm Khalil Stemmler, a software developer / designer & musician living in Oakville, Canada. 
      I work as a consultant <a href="https://www.dev6.com/">Aquent | Dev6</a> and I'm the co-founder / CTO 
      of <a href="https://univjobs.ca/">Univjobs</a>. I write and share what I know about 
      JavaScript, building a startup and software design.
    </p>

    <p>
      <b>Who is this site for:</b> The content I write about on my blog is oriented towards the goal of helping junior 
      or intermediate-level Node and React/Angular developers learn how to apply enterprise software design patterns 
      and principles to write clean and scalable code, usually with TypeScript. 
    </p>

    <hr></hr>

    <p>
      <b>A bit more:</b> I hold both a Bachelors Degree in <a href="https://brocku.ca/webcal/2013/undergrad/cncc.html">Computer Science</a> from 
      Brock University and a 
      Diploma in <a href="https://academics.sheridancollege.ca/programs/bachelor-of-computing-and-network-communications-honours-internet-communications-technology">Internet Communications Technology</a> from Sheridan College. 
      At this point in my career, I'm
      predominantly interested in Typescript, enterprise application architecture, DDD, business and interface design.
    </p>

    <p>
      Near the end of my undergraduate studies in 2017, I co-founded Univjobs, diving my spare time between learning how to build, design,
      ship, gather feedback and iterate on software products in the real world.

      Since then, Univjobs has grown to be a platform used by over 7000+ students and recent grads.
    </p>
    
    <p>
      I write a lot of HTML, CSS, JavaScript and TypeScript on a daily basis. If you're interested in the <a href="/uses">tech 
      stacks and tools I use</a>, you can find that out <a href="/uses">here</a>.
    </p>

    <p>
      When I'm not coding or <a href="/books">reading excellent software books</a>, I like to spend time with my
      beautiful girlfriend, write and record <a href="/music">music</a>, longboard and jog around Oakville.
    </p>

    <h3>Core skillset</h3>
    <p>
      <p>These are my essential skills that appear across 95% of my daily work.</p>
      <ul>
        <li>JavaScript</li>
        <li>CSS</li>
        <li>HTML5</li>
        <li>Mobile & Responsive Design</li>
        <li>Node.js & TypeScript</li>
        <li>MySQL & Database Design</li>
      </ul>
    </p>

    <h3>Libraries & Frameworks</h3>
    
    <p>
      <p>These are frameworks, libraries and testing utilities that I prefer to use. For more
        information about which frameworks/libs I use for which types of projects, check out my <a href="/uses">/uses</a> page.
      </p>
      <ul>
        <li>Angular, AngularJS, React w/ Redux</li>
        <li>Jest</li>
        <li>Enzyme</li>
        <li>Sequelize ORM</li>
        <li>Express.js</li>
        <li>Static-site rendering w/ GatsbyJS</li>
      </ul>
    </p>

    <h3>Integrations, Ops, Databases, Caches, Other</h3>

    <p>
      <p>
        These are integrations, tools and that I've had the chance to get well 
        acquainted with.
      </p>
      <ul>
        <li>D3.js</li>
        <li>Stripe Payments</li>
        <li>Mixpanel</li>
        <li>Web Audio API</li>
        <li>Prerendering w/ Prerender.io</li>
        <li>AWS (Lambda, EC2, S3, IAM, EB, API Gateway)... working towards becoming more efficient
          automating services using Terraform.
        </li>
        <li>MongoDB</li>
        <li>Elasticsearch</li>
        <li>Redis</li>
      </ul>
    </p>    

    <h3>Resume</h3>
    <p> 
      <p>Last updated Feb 12th, 2019</p>
      <a href="/files/Khalil-Stemmler-Resume-2019.pdf">Check it out here.</a>
    </p>
    

  </Layout>
)

export default About;