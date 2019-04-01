import React from 'react'
import PropTypes from 'prop-types'
import insta from '../../../../images/social/instagram.svg'
import twitter from '../../../../images/social/twitter.svg'
import linkedin from '../../../../images/social/linkedin.svg'
import github from '../../../../images/social/github.svg'

import '../styles/SocialLinks.sass'

const links = [
  { link: 'https://instagram.com/stemmlerjs', image: insta },
  { link: 'https://twitter.com/stemmlerjs', image: twitter },
  { link: 'https://github.com/stemmlerjs', image: github },
  { link: 'https://www.linkedin.com/in/khalilstemmler/', image: linkedin }
]

const SocialLinks = () => (
  <div className="social-links">
    { links.map((element, i) => (
      <a className="link" key={i} href={element.link}>
        <img src={element.image}/>
      </a>
    ))}
  </div>
)

export default SocialLinks;