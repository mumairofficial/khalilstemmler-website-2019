import React from 'react'
import PropTypes from 'prop-types'
import Layout from "../components/shared/layout"
import SEO from "../components/shared/seo"
import { StaticQuery, graphql } from "gatsby"

class Blog extends React.Component {
  constructor (props) {
    super(props);
  }
  render () {
    return (
      <Layout title="blog">
        <SEO title="Music"/>
        Blog
      </Layout>
    )
  }
}

export default () => (
  <StaticQuery
    query={graphql`
      query Blog {
        categories: allMarkdownRemark(
          filter: { frontmatter: { 
            templateKey: { eq: "blog-post" },
            published: { eq: true }  } }
          limit: 1000
        ) {
          edges {
            node {
              frontmatter {
                category
              }
            }
          }
        }
    
        tags: allMarkdownRemark(
          filter: { frontmatter: { 
            templateKey: { eq: "blog-post" }, 
            published: { eq: true } 
          } }
          limit: 1000
        ) {
          edges {
            node {
              frontmatter {
                tags
              }
            }
          }
        }
    
        posts: allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: {
            frontmatter: {
              templateKey: { eq: "blog-post" }
              published: { eq: true }
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
                date
                description
                tags
                category
                image
              }
            }
          }
        }
      }
    `}
    render={data => {
      console.log(data);
      return (
        <Blog/>
      )
    }}
  />
)