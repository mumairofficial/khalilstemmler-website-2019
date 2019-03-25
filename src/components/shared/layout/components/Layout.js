import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

import Banner from "./Banner"
import Navigation from './Navigation'
import LayoutCol from "./LayoutColumn";
import Footer from './Footer';

import "../styles/layout.css"
import "../styles/layout.sass"
import "../../../../assets/styles/prism.css"
// require('prismjs/themes/prism-okaidia.css')

// TODO: The SEO component should really live in this component and be configurable
// via the props to Layout.

const Layout = ({ children, title, component }) => (
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
        <Banner siteTitle={data.site.siteMetadata.title} />
        <div
          style={{
            margin: `0 auto`,
            maxWidth: 960,
            padding: `0px 1.0875rem 1.45rem`,
            paddingTop: '4em',
          }}
        >
          <main 
            className="main"
            style={{
              display: 'flex'
            }}>
              <Navigation/>
              <LayoutCol index={0}>
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

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  component: PropTypes.any,
  title: PropTypes.string
}

export default Layout
