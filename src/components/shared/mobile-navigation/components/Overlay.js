import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import '../styles/Navbar.sass'

const OverlayLink = ({ path, displayName, toggleBurgerMenu }) => {
  return (
    <div
      className="mobileNavItem"
      onClick={toggleBurgerMenu}
    >
      <Link to={path}>{displayName}</Link>
    </div>
  )
}

OverlayLink.propTypes = {
  path: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  toggleBurgerMenu: PropTypes.func.isRequired
}

const Overlay = props => {
  return (
    <div
      className={
        props.isOpen
          ? `overlayOpen overlayContainer`
          : "overlayContainer"
      }
    >
      <OverlayLink path={"/"} displayName="Home" toggleBurgerMenu={props.toggleBurgerMenu}/>
      <OverlayLink path={"/about"} displayName="About" toggleBurgerMenu={props.toggleBurgerMenu}/>
      <OverlayLink path={"/blog"} displayName="Blog" toggleBurgerMenu={props.toggleBurgerMenu}/>
      <OverlayLink path={"/contact"} displayName="Contact" toggleBurgerMenu={props.toggleBurgerMenu}/>
      <OverlayLink path={"/work"} displayName="Work" toggleBurgerMenu={props.toggleBurgerMenu}/>
    </div>
  )
}

export default Overlay;