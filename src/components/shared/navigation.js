
import React from 'react'
import { Link } from 'gatsby'

const Navigation = () => (
  <div className="navigation">
    <Link to="/">~</Link>
    <Link to="/blog">./blog</Link>
    <Link to="/music">./music</Link>
    <Link to="/portfolio">./porfolio</Link>
    <Link to="/contact">./contact</Link>
    ./resources
    <Link to="/books"><span className="space">___</span>./books</Link>
  </div>
)

export default Navigation;

Navigation.propTypes = {

}