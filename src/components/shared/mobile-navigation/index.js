import React from 'react'
import MobileBurgerMenu from './components/MobileBurgerMenu'
import Overlay from './components/Overlay'
// import Link from 'gatsby-link'
// // import github from '../../img/github-icon.svg'
// import logo from '../../img/logo.png'
// import smallLogo from '../../img/small-logo.png'
// import navbarStyles from './styles/Navbar.module.css'

/**
 * @class Navbar
 * @desc This is the navbar that is shown across the screen
 * on all sizes. When it's resized to a certain point, the mobile
 * nav is shown.
 * 
 * Allows the user to open the Overlay component.
 * @see Overlay.js
 */

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
    }
  }

  toggleBurgerMenu = () => {
    this.setState({
      ...this.state,
      menuOpen: !this.state.menuOpen,
    })
  }

  componentDidMount = () => {}

  render = () => {
    return (
      <nav className="nav">
        <MobileBurgerMenu
          menuOpen={this.state.menuOpen}
          toggleBurgerMenu={this.toggleBurgerMenu}
          topOffset={this.props.topOffset}
        />
        <Overlay
          isOpen={this.state.menuOpen}
          toggleBurgerMenu={this.toggleBurgerMenu}
        />
      </nav>
    )
  }
}

export default Navbar
