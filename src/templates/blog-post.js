import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from "gatsby"
import Layout from "../components/shared/layout"
import { Article } from '../components/shared/articles'
import { PageType } from '../components/shared/seo/PageType';

const BlogPost = (props) => {
  const { markdownRemark } = props.data
  const { fields, frontmatter, html } = markdownRemark;
  const { slug } = fields;
  const {
    title,
    image,
    description,
    date,
    updated,
    category,
    tags
  } = frontmatter;

  let seoTags = tags ? tags : [];
  seoTags = seoTags.concat(category);

  return (
    <Layout
      seo={{
        title,
        keywords: seoTags,
        image,
        description,
        pageType: PageType.ARTICLE,
        datePublished: date,
        dateModified: updated,
        slug
      }}
    >
      <Article
        {...fields}
        {...frontmatter}
        html={html}
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
        readingTime {
          text
        }
      }
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        updated(formatString: "MMMM DD, YYYY")
        title
        description
        tags
        image
        category
        anchormessage
      }
    }
  }
`