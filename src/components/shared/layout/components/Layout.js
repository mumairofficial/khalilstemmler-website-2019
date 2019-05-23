import React from "react"
import PropTypes from "prop-types"
import { ToastConsumer, ToastProvider } from 'react-toast-notifications';

import Banner from "./Banner"
import Navigation from './Navigation'
import LayoutCol from "./LayoutColumn";
import Footer from './Footer';
import MobileNavigation from '../../mobile-navigation'
import { SEO } from '../../seo'

import "../styles/layout.css"
import "../styles/layout.sass"
import "../../../../assets/styles/prism.css"
import DarkModeToggle from "../../../dark-mode-toggle";

const hasContent = (title, component) => {
  if (!title && !component) return false;
  return true;
}

class Layout extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      darkModeEnabled: this.getDarkModeDefault(),
      isBannerOpen: this.shouldBannerOpen()
    }

    this.toggleDarkMode = this.toggleDarkMode.bind(this);
    this.closeBanner = this.closeBanner.bind(this);
    this.shouldBannerOpen = this.shouldBannerOpen.bind(this);
    this.setBannerClosedExpiry = this.setBannerClosedExpiry.bind(this);
    this.getDarkModeDefault = this.getDarkModeDefault.bind(this);
  }

  closeBanner () {
    this.setState({ 
      ...this.state,
      isBannerOpen: false 
    })
    this.setBannerClosedExpiry();
  }

  getDarkModeDefault () {
    if (typeof document !== "undefined") {
      const bodyClasses = document.body.classList;
      return bodyClasses.contains('dark-mode');
    }
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
      darkModeEnabled: !enabled
    });
  }

  isDarkModeEnabled () {
    return this.state.darkModeEnabled;
  }

  isRawModeEnabled () {
    return !!this.props.rawMode;
  }

  render () {
    console.log(process.env)
    const { children, title, component, seo } = this.props;
    const { isBannerOpen } = this.state;
    return (
      <> 
        <ToastProvider>
          <SEO 
            title={seo.title}
            image={seo.image}
            description={seo.description}
            pageType={seo.pageType}
            datePublished={seo.datePublished}
            dateModified={seo.dateModified}
            keywords={seo.keywords}
            breadcrumbs={seo.breadcrumbs}
            slug={seo.slug}
          />
          <MobileNavigation
            topOffset={isBannerOpen ? '44px' : '10px'}
          />
          <Banner 
            isOpen={isBannerOpen}
            onCloseBanner={this.closeBanner}
          /> 
          {/* <DarkModeToggle 
            darkModeEnabled={darkModeEnabled} 
            onClick={this.toggleDarkMode}
          />
           */}

           <Navigation/>
          
          <div className="main-container">
            <main 
              className="main"
              style={{
                display: 'flex'
              }}>
              { !this.isRawModeEnabled() ? (
                <>
                  <LayoutCol 
                    checkContent={true}
                    hasContent={hasContent(title, component)} 
                    index={0}>
                    {title ? <h2>{title}</h2> : ''}
                    {component ? component : ''}
                  </LayoutCol>
                  <LayoutCol index={1}>
                    {children}
                  </LayoutCol>
                </>
              ) : children }
              </main>
            </div>
            { !this.isRawModeEnabled() ? <Footer/> : '' }
        </ToastProvider>
      </>
    )
  }
}


Layout.propTypes = {
  children: PropTypes.node.isRequired,
  component: PropTypes.any,
  title: PropTypes.string,
  seo: PropTypes.shape({
    pageType: PropTypes.string.isRequired,
    post: PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      excerpt: PropTypes.string,
      slug: PropTypes.string.isRequired,
      datePublished: PropTypes.string,
      dateModified: PropTypes.string,
    }).isRequired,
    image: PropTypes.string,
    keywords: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  rawMode: PropTypes.bool
}

export default Layout
