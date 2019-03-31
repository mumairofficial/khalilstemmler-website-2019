import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

import Banner from "./Banner"
import Navigation from './Navigation'
import LayoutCol from "./LayoutColumn";
import Footer from './Footer';
import MobileNavigation from '../../mobile-navigation'

import "../styles/layout.css"
import "../styles/layout.sass"
import "../../../../assets/styles/prism.css"
import DarkModeToggle from "../../../dark-mode-toggle";
// require('prismjs/themes/prism-okaidia.css')

const hasContent = (title, component) => {
  if (!title && !component) return false;
  return true;
}

// TODO: The SEO component should really live in this component and be configurable
// via the props to Layout.

class Layout extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      darkModeEnabled: false,
      isBannerOpen: this.shouldBannerOpen()
    }

    this.toggleDarkMode = this.toggleDarkMode.bind(this);
    this.closeBanner = this.closeBanner.bind(this);
    this.shouldBannerOpen = this.shouldBannerOpen.bind(this);
    this.setBannerClosedExpiry = this.setBannerClosedExpiry.bind(this);
  }

  closeBanner () {
    this.setState({ 
      ...this.state,
      isBannerOpen: false 
    })
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

  toggleDarkMode = () => {
    const enabled = this.state.darkModeEnabled;

    if (enabled) {
      document.body.classList.remove('dark-mode');
    } else {
      document.body.classList.add('dark-mode');
    }

    this.setState({
      darkModeEnabled: !this.state.darkModeEnabled
    });

  }

  render () {
    const { children, title, component } = this.props;
    const { isBannerOpen } = this.state;
    return (
      <StaticQuery
        query={graphql`
          query SiteTitleQuery {
            site {
              siteMetadata {
                title
              }
            }
          }
        `}
        render={data => (
          <> 
          {/* TODO: Add an SEO component */}
            <MobileNavigation
              topOffset={isBannerOpen ? '44px' : '10px'}
            />
            <Banner 
              siteTitle={data.site.siteMetadata.title} 
              isOpen={isBannerOpen}
              onCloseBanner={this.closeBanner}
            />
            <DarkModeToggle 
              darkModeEnabled={this.state.darkModeEnabled} 
              onClick={this.toggleDarkMode}
            />
            <div className="main-container">
              <main 
                className="main"
                style={{
                  display: 'flex'
                }}>
                  <Navigation/>
                  <LayoutCol 
                    checkContent={true}
                    hasContent={hasContent(title, component)} index={0}>
                    {title ? <h2>{title}</h2> : ''}
                    {component ? component : ''}
                  </LayoutCol>
                  <LayoutCol index={1}>
                    {children}
                  </LayoutCol>
                </main>
            </div>
            <Footer/>
          </>
        )}
      />
    )
  }
}


Layout.propTypes = {
  children: PropTypes.node.isRequired,
  component: PropTypes.any,
  title: PropTypes.string
}

export default Layout
