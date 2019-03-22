import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import "../styles/Footer.sass"
import prose from '../../../../assets/prose'

const MenuList = props => {
  return (
    <div className="menu-list">
      <div className="menu-list--title">{props.title}</div>
      {props.items.map((item, index) => {
        if (item.email) {
          return (
            <a key={index} href="mailto:khalilstemmler@gmail.com">
              {item.name}
            </a>
          )
        } else if (item.external) {
          return (
            <a key={index} href={item.url}>
              {item.name}
            </a>
          )
        } else
          return (
            <Link style={{ textDecoration: 'none' }} to={item.url} key={index}>
              {item.name}
            </Link>
          )
      })}
    </div>
  )
}

const Menu = () => {
  return (
    <div className="menu-list--container">
      <MenuList
        title={'Menu'}
        items={[
          { name: 'About', url: '/about' },
          { name: 'Blog', url: '/blog' },
          { name: 'Services', url: '/services' },
        ]}
      />
      <MenuList
        title={'Contact'}
        items={[
          {
            name: 'Email',
            url: 'khalilstemmler@gmail.com',
            email: true,
          },
          {
            name: '@stemmlerjs',
            url: 'https://twitter.com/stemmlerjs',
            external: true,
          },
        ]}
      />

      <MenuList
        title={'Social'}
        items={[
          {
            name: 'GitHub',
            url: 'https://github.com/stemmlerjs',
            external: true,
          },
          {
            name: 'Twitter',
            url: 'https://twitter.com/stemmlerjs',
            external: true,
          },
          {
            name: 'Instagram',
            url: 'https://instagram.com/stemmlerjs',
            external: true,
          },
          {
            name: 'LinkedIn',
            url: 'https://www.linkedin.com/in/khalilstemmler/',
            external: true,
          },
        ]}
      />
    </div>
  )
}

const Footer = () => (
  <footer className="footer">
    { prose.main.description }
    <Menu/>
  </footer>
)

export default Footer;