import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import closeButton from '../../images/icons/close.svg'

const messages = [
  <div className="message">want to see a cool trick I can do? check out <Link to="/music/">my music</Link>.</div>,
  <div className="message">what the hell</div>
]

const Header = ({ siteTitle }) => (
  <header>
    {messages[0]}
    <div className="close-button">
      <img alt="Close" src={closeButton}></img>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
