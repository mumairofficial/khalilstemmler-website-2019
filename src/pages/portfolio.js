import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from "gatsby"
import Layout from "../components/shared/layout"

export default class Porfolio extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <Layout 
        title="Portfolio"
        seo={{
          title: 'Portfolio',
          keywords: []
        }}>
        <h3>👷🚧 Under construction 👷🚧</h3>
        <p>The new portfolio isn't here yet. The last time I updated my portfolio 
          was May 2018. Quite a few new things since then during my time at Aquent | Dev6, 
          I'm just not sure how much 
          of it I have clearance to post... 🤔
        </p>
        <p>You can view my <a href="https://khalilstemmler-2018.netlify.com/work">old 2018 portfolio</a> here though.</p>
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


