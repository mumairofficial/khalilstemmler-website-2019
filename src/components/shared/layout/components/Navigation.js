
import React from 'react'
import { Link } from 'gatsby'

const Navigation = () => (
  <div className="navigation">
    <Link to="/">~</Link>
    <Link to="/articles">./articles</Link>
    <Link to="/about">./about</Link>
    {/* <Link to="/music">./music</Link> */}
    /music
    <Link to="/portfolio">./porfolio</Link>
    <a href="mailto:khalilstemmler@gmail.com">./contact</a>
    ./resources
    <Link to="/books"><span className="space">___</span>./books</Link>
  </div>
)

export default Navigation;

Navigation.propTypes = {

}