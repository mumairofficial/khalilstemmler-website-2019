import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import Line from '../../shared/line'

const Hero = () => (
  <>
  <p className="intro-text">
  {`software developer / designer, musician based 
    out of southern ontario cities currently working 
    in the wonderful world of software consulting`}
  </p>
  <Line/>
  <br></br>
  <p>
    I’m <Link to="/about">currently working</Link> at <a href="https://www.dev6.com/">Aquent Dev6</a> as a consultant. 
    Day to day involves collaborating with remote development teams on 
    front-end architectures, keeping up w/ current 
    technology in our industry, creating course content, advising 
    best practices, and learning from other talented consultants.
  </p>
  <p>
    What am I good at? Full-stack web development. <Link to="/skills">My skills</Link> revolve 
    around JavaScript, and the various flavours of it. Today, I'm most focused on 
    design, TypeScript and enterprise application architecture. 
    I believe that there’s only enough time on earth to truly become 
    an expert at one or two things. Software development is one 
    of my picks and I’m working towards it every day. Music 
    is the other.
  </p>
  </>
)

export default Hero;

