import React from 'react'
import { StaticQuery, graphql } from "gatsby"
import { Articles } from '../pages/articles'

const TagsRoute = (props) => {
  return (
    <Articles 
      {...props.data}
      {...props}
      isCategoryPage={false}
      isTagsPage={true}
    />
  )
}

export default TagsRoute

export const tagPageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
      }
    }

    categories: allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "article" }, published: { eq: true }   } }
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
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "article" }, published: { eq: true }   } }
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
      limit: 1000
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: {
        frontmatter: {
          tags: { in: [$tag] }
          templateKey: { regex: "/(blog-post|article)/" }
          published: { eq: true }
        }
      }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
            readingTime {
              text
            }
          }
          frontmatter {
            title
            date
            description
            tags
            category
            image
            updated
          }
        }
      }
    }
  }
`
