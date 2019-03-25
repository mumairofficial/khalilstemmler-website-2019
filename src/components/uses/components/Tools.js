import React from 'react'
import PropTypes from 'prop-types'
import SetupHeroImage from '../setup-images/SetupHeroImage'

const Tools = () => (
  <div>
    <SetupHeroImage/>
    <br></br>

    <h3>Design</h3>
    <ul>
      <li>Figma, Adobe XD & InVision for user interface design and wireframes</li>
      <li><a href="https://unsplash.com/">Unsplash</a> & <a href="https://burst.shopify.com/">Burst</a> for stock images</li>
    </ul>

    <h3>Development</h3>

    <h4>For large projects</h4>
    <p>I'll usually use TypeScript or something</p>

    <h4>For small projects (libraries, etc)</h4>
    <p>I might just use NodeJS</p>


    <h3>Setup</h3>

    I also maintain a list of useful links for development and design on my <a href="https://github.com/stemmlerjs/developer-list">Github</a>.
  </div>
)

export default Tools;