
import React from 'react'
import { Link } from 'gatsby'
import "../styles/Navigation.sass"

const Navigation = () => (
  <div className="navigation">
    <a href="https://khalilstemmler.com/">~</a>
    <Link to="/articles">./articles</Link>
    <Link to="/about">./about</Link>
    <a href="mailto:khalilstemmler@gmail.com">./contact</a>
    {/* <Link to="/music">./music</Link> */}
    /music
    <Link to="/portfolio">./porfolio</Link>
    <Link to="/resources">./resources</Link>
    <Link to="/books"><span className="space">__</span>./books</Link>
    <Link to="/wiki">./wiki</Link>
  </div>
)

export default Navigation;

Navigation.propTypes = {

}