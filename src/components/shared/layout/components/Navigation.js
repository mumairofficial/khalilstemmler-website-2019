
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import MobileNavigation from '../../mobile-navigation'
import Banner from "./Banner"
import "../styles/Navigation.sass"
import icon from '../../../../images/icons/mystery-icon.svg'

class Navigation extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      isBannerOpen: this.shouldBannerOpen(),
      scrolled: false,
    }

    this.navOnScroll = this.navOnScroll.bind(this);
    this.shouldBannerOpen = this.shouldBannerOpen.bind(this);
    this.closeBanner = this.closeBanner.bind(this);
    this.setBannerClosedExpiry = this.setBannerClosedExpiry.bind(this);
  }

  componentDidMount() {
    typeof window !== 'undefined' 
      && window.addEventListener('scroll', this.navOnScroll)
  }

  componentWillUnmount() {
    typeof window !== 'undefined' 
      && window.removeEventListener('scroll', this.navOnScroll)
  }

  navOnScroll () {
    if (window.scrollY > 20) {
      this.setState({ scrolled: true })
    } else {
      this.setState({ scrolled: false })
    }
  }

  setBannerClosedExpiry () {
    const expiry = new Date();
    expiry.setMinutes(expiry.getMinutes() + 20)
    const object = { value: "banner-closed", timestamp: expiry }
    localStorage.setItem("banner-closed", JSON.stringify(object));
  }

  closeBanner () {
    this.setState({ 
      ...this.state,
      isBannerOpen: false 
    })
    this.setBannerClosedExpiry();
  }

  shouldBannerOpen () {
    if (typeof localStorage !== "undefined") { 
      const item = localStorage.getItem('banner-closed');
      if (item) {
        try {
          const expiry = JSON.parse(item);
          const expiryTime = new Date(expiry.timestamp);
          const now = new Date()
          const isStillExpired = (now.getTime() - expiryTime.getTime()) < 0;
          return !isStillExpired;
        } catch (err) {
          return true;
        }
      } else {
        return true;
      }
    }
  }

  render () {
    const { rawMode } = this.props;
    const { scrolled, isBannerOpen } = this.state;

    return (
      <>
      <MobileNavigation
        topOffset={isBannerOpen ? '44px' : '10px'}
      />
      <Banner 
        isOpen={isBannerOpen}
        onCloseBanner={this.closeBanner}
      />

      {!rawMode ? <div 
        style={{ marginTop: isBannerOpen ? '35px' : '0px'}}
        className={scrolled ? "navigation scroll" : "navigation"}>
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
      </div> : ''}
      </>
    )
  }
}

export default Navigation;

Navigation.propTypes = {
  rawMode: PropTypes.bool
}