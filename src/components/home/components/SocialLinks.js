import React from 'react'
import "../styles/SocialLinks.sass"

const links = [
  { url: 'https://www.linkedin.com/in/khalilstemmler/', name: 'linkedin' },
  { url: 'https://github.com/stemmlerjs', name: 'github' },
  { url: 'https://twitter.com/stemmlerjs', name: 'twitter' },
  { url: 'mailto:khalilstemmler@gmail.com?Subject=Hello!', name: 'email' },
  { url: 'https://instagram.com/stemmlerjs', name: 'instagram' }
]

const SocialLinks = () => (
  <div className="social-links">
    {links.map((link, i) => (
      <a className="social-link" key={i} href={link.url}>{link.name}</a>
    ))}
  </div>
)

export default SocialLinks;