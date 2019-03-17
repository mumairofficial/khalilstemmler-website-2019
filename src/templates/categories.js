import React from 'react'
import { StaticQuery, graphql } from "gatsby"
import { Articles } from '../pages/articles'

const CategoryRoute = (props) => {
  return (
    <Articles 
      {...props.data}
      {...props}
      isCategoryPage={true}
    />
  )
}

export default CategoryRoute

export const categoryPageQuery = graphql`
  query CategoryPage($category: String) {
    site {
      siteMetadata {
        title
      }
    }

    categories: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { 
        templateKey: { eq: "blog-post" },
        published: { eq: true }  
      } }
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
      filter: { frontmatter: { templateKey: { eq: "blog-post" }, published: { eq: true }   } }
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
      filter: {
        frontmatter: {
          category: { eq: $category }
          templateKey: { eq: "blog-post" }
          published: { eq: true }
        }
      }
    ) {
      totalCount
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
`
