
import React from 'react'
import { Link } from 'gatsby'
import "../styles/Navigation.sass"
import icon from '../../../../images/icons/mystery-icon.svg'

const Navigation = () => (
  <div className="navigation">
    <div className="navigation-inner">
      <a className="logo" href="https://khalilstemmler.com/">
        <img src={icon}/>
        <p>khalil stemmler</p>
      </a>

      <div className="links">
        <Link to="/courses">Courses</Link>
        <Link to="/articles">Articles</Link>
        <Link to="/resources">Resources</Link>
        <Link to="/newsletter">Newsletter</Link>
        <Link to="/wiki">Wiki</Link>
      </div>
    </div>
  </div>
)

export default Navigation;

Navigation.propTypes = {

}