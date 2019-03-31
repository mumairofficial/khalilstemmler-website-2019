import React from 'react'
import PropTypes from 'prop-types'
import SetupHeroImage from '../setup-images/SetupHeroImage'

const Tools = () => (
  <div>
    <SetupHeroImage/>
    <br></br>

    <hr/>

    <h3>Design</h3>
    <p>
      I'm not the best designer, but I do make a huge effort to try to understand my users to produce
      interfaces that are functional and delightful. 
    </p>

    <u><h4>Design tools</h4></u>
    <p>For drawing out rough to high-fi wireframes, I'll usually use <a href="https://figma.com">Figma</a> or Adobe XD. I think 
    these tools are really good for developers who aren't actually designers by trade. The number of buttons, menus and 
    functionality that's possible with the tool itself is quite minmal, but I find I can accomplish 
    80 to 90 percent of most tasks with 'em. It's a lot
    less daunting than Photoshop or the other Adobe alternatives.</p>

    <p>
      For stock photos, I use <a href="https://unsplash.com/">Unsplash</a> and <a href="https://burst.shopify.com/">Burst</a>.
    </p>

    <u><h4>Design methodologies</h4></u>
    <p>
      Stanford has this really great crash course on <u>Design Thinking</u>. I'd recommend checking 
      it out if you're into human-centered design and would like to learn how to 
      to solve people's problems through Empathy. <a href="https://static1.squarespace.com/static/57c6b79629687fde090a0fdd/t/5b19b2f2aa4a99e99b26b6bb/1528410876119/dschool_bootleg_deck_2018_final_sm+%282%29.pdf">The Design Thinking Bootleg</a> is 
      a set of tools and methods that I use to design for users of products I build.
    </p>

    <hr/>

    <h3>Development</h3>

    <p>
      I'm predominantly a JavaScript developer. However, September last year (2018), I started using TypeScript and it's 
      become my preference (type safety, classical object orientation, compile-time error checking). It's beautiful... but I'm often
      going overboard (bit by the statically-typed bug).
    </p>

    <u><h4>For small front end codebases</h4></u>
    <p>
      My library of choice is React.js. It's like lego to me. Such a delightful tool. I'm a huge fan 
      of JSX over templates, any day. Smaller projects and projects where I'm the sole developer will usually 
      be in React with Sass for styling.
    </p>

    <u><h4>For small back end codebases</h4></u>
    <p>
      If you asked me last year, I'd say it would have been vanilla Node.js, but these days, I'm inclined to 
      pass all of my Node.js code through a TypeScript compiler and write TS code instead. It's a lot 
      easier for me to practice writing SOLID code this way.
    </p>

    <u><h4>For large front end projects</h4></u>
    <p>
      React + Redux w/ TypeScript OR Angular + RxJs. 
    </p>

    <p>
      Angular works better when I'm on a team of 3 or more developers because 
      everyone seems to have their own React style. It also depends on the skill level of everyone on the team, 
      but I find that having a rigid framework like Angular where there's only one or two correct ways to do things,
      like Route Guards for example, is a benefit to team productivity.
    </p>
    
    <u><h4>Source control</h4></u>
    <p>
      Git all the way. I prefer to use the <a href="https://danielkummer.github.io/git-flow-cheatsheet/">Git Flow</a> branching model for 
      collaboration and releases.
    </p>

    <u><h4>Continuous Integration</h4></u>
    <p>
      I've been really happy with using <a href="https://gitlab.com">GitLab's CI</a> tools for the past couple years. 
      I've also used <a href="https://jenkins.io/">Jenkins</a> in the past.
    </p>

    <u><h4>Ops / Automation</h4></u>
    <p>
      Terraform over CloudFormation, and AWS over GCP. Ansible for random stuff. 
    </p>

    <u><h4>Prerendering</h4></u>
    <p>
      <a href="https://prerender.io">Prerender.io</a> has done a really good job and I've been happy with 
      using them for prerendering some of my apps social links so that they can look pretty when they're 
      shared on social media. 
    </p>

    <u><h4>Analytics</h4></u>
    <p>
      <a href="https://analytics.amplitude.com">Amplitude</a> for tracking events, <a href="https://www.hotjar.com/">HotJar</a> for heat maps, <a href="https://analytics.google.com/analytics/">Google Analytics</a> for
      everything else.
    </p>

    <hr/>
    <h3>Setup</h3>

    <u><h4>Laptop</h4></u>
    <p>
      I code with a 2017 15-inch Macbook Pro with a 2.8 GHz Intel Core i7 processor, 16 GB of LPDDR3 ram and a 1TB hard drive.
      It's the fastest machine I've ever used. I never thought I'd become a "Mac guy", but here I am.
    </p>

    <u><h4>Display</h4></u>
    <p>
      Currently, I code with two external monitors. I've really been digging the vertical slant these days, it's 
      nice for having Slack, Asana or Discord open to monitor what's going on remotely.
    </p>

    {/* I also maintain a list of useful links for development and design on my <a href="https://github.com/stemmlerjs/developer-list">Github</a>. */}
  </div>
)

export default Tools;