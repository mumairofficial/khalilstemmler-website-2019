import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import closeButton from '../../../../images/icons/close.svg'
import "../styles/banner.sass"

const messages = [
  <div className="message">want to see a cool trick I can do? check out <Link to="/music/">my music</Link>.</div>,
  <div className="message">what the hell</div>
]

const Banner = ({ siteTitle }) => (
  <header>
    {messages[0]}
    <div className="close-button">
      <img alt="Close" src={closeButton}></img>
    </div>
  </header>
)

Banner.propTypes = {
  siteTitle: PropTypes.string,
}

Banner.defaultProps = {
  siteTitle: ``,
}

export default Banner
