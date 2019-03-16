import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from "gatsby"
import Layout from "../components/shared/layout"
import SEO from "../components/shared/seo"
import { Article } from '../components/shared/articles'

const BlogPost = (props) => {
  const { markdownRemark } = props.data
  const { fields, frontmatter, html } = markdownRemark;
  const { slug } = fields;
  const {
    title 
  } = frontmatter;
  console.log('blog post template', props)
  return (
    <Layout 
      component={<Article
        {...fields}
        {...frontmatter}
        html={html}
      />}>
      <SEO 
        // TODO: Make it so that this is standardized
        title="Blog Post" 
        keywords={[`gatsby`, `application`, `react`]} 
      />
    </Layout>
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      fields: PropTypes.shape({
        slug: PropTypes.string.isRequired
      }).isRequired,
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        image: PropTypes.string,
        date: PropTypes.string.isRequired,
        category: PropTypes.string,
        description: PropTypes.string.isRequired,
        tags: PropTypes.arrayOf(PropTypes.string).isRequired,
      }).isRequired,
      html: PropTypes.string
    }),
  }),
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      fields {
        slug
      }
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
        image
        category
      }
    }
  }
`