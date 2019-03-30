import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import closeButton from '../../../../images/icons/close.svg'
import "../styles/banner.sass"

const messages = [
  <marquee direction="right" className="message">want to see a cool trick I can do? check out <Link to="/music/">my music</Link>.</marquee>,
  <div className="message">what the hell</div>
]


class Banner extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      closed: !this.shouldBannerOpen()
    }

    this.close = this.close.bind(this);
    this.shouldBannerOpen = this.shouldBannerOpen.bind(this);
    this.setBannerClosedExpiry = this.setBannerClosedExpiry.bind(this);
  }

  close () {
    this.setState({ closed: true })
    this.setBannerClosedExpiry();
  }

  shouldBannerOpen () {
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

  setBannerClosedExpiry () {
    const expiry = new Date();
    expiry.setMinutes(expiry.getMinutes() + 20)
    const object = { value: "banner-closed", timestamp: expiry }
    localStorage.setItem("banner-closed", JSON.stringify(object));
  }

  render () {
    const isBannerClosed = this.state.closed;
    return (
      <header className={`${isBannerClosed ? 'closed' : ''}`}>
        {messages[0]}
        <div onClick={this.close} className="close-button">
          <img alt="Close" src={closeButton}></img>
        </div>
      </header>
    )
  }
}

Banner.propTypes = {
  siteTitle: PropTypes.string,
}

Banner.defaultProps = {
  siteTitle: ``,
}

export default Banner
