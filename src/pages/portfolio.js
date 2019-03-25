import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from "gatsby"
import Layout from "../components/shared/layout"

export default class Porfolio extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    console.log(this.props)
    return (
      <Layout title="portfolio">
        portfolio
      </Layout>
    )
  }
};

export const pageQuery = graphql`
  query Portfolio {
    portfolioItems: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: {
        frontmatter: {
          templateKey: { eq: "portfolio-page" }
        }
      }
      limit: 1000
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            image 
            description
            date
          }
        }
      }
    }
  }
`


