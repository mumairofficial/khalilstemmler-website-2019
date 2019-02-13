import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

import Header from "../components/shared/header"
import "./layout.css"
import "./layout.sass"
import LayoutCol from "../components/shared/layout-col";
import MusicPlayer from '../components/audio-player/components'

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
        <Header siteTitle={data.site.siteMetadata.title} />
        <div
          style={{
            margin: `0 auto`,
            maxWidth: 960,
            padding: `0px 1.0875rem 1.45rem`,
            paddingTop: '4em',
          }}
        >
          <main 
            style={{
              display: 'flex'
            }}>
            <MusicPlayer/>
              <LayoutCol>
                {title ? <h2>{title}</h2> : ''}
                {component ? component : ''}
              </LayoutCol>
              <LayoutCol>
                {children}
              </LayoutCol>
            </main>
          {/* <footer>
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </footer> */}
        </div>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
