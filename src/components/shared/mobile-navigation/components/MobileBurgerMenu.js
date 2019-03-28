import React from 'react'
import PropTypes from 'prop-types'
import '../styles/Navbar.sass'

const MobileBurgerMenu = props => {
  return (
    <div
      className="burgerMenuNavItem"
      href="javascript:void(0);"
      onClick={props.toggleBurgerMenu}
    >
      <div className="barContainer">
        <div
          className={
            props.menuOpen
              ? `change1 bar1`
              : 'bar1'
          }
        />
        <div
          className={
            props.menuOpen
              ? `change2 bar2`
              : 'bar2'
          }
        />

        <div
          className={
            props.menuOpen
              ? `change3 bar3`
              : "bar3"
          }
        />
      </div>
    </div>
  )
}

MobileBurgerMenu.propTypes = {
  menuOpen: PropTypes.bool.isRequired,
  toggleBurgerMenu: PropTypes.func.isRequired
}

export default MobileBurgerMenu;