import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from "gatsby"
import Layout from "../components/shared/layout"
import { Wiki } from '../components/wiki'

const WikiPost = (props) => {
  const { markdownRemark } = props.data
  const { fields, frontmatter, html, excerpt } = markdownRemark;
  const {
    name,
    wikitags,
    wikicategory,
    image
  } = frontmatter;
 
  let seoTags = wikitags ? wikitags : [];
  seoTags = seoTags.concat(wikicategory);
  
  return (
    <Layout
      seo={{
        title: `${name} - ${wikicategory}`,
        keywords: seoTags,
        description: excerpt,
        image: image ? image : null
      }}
    >
      <Wiki
        {...fields}
        {...frontmatter}
        html={html}
      />
    </Layout>
  )
}

export default WikiPost;

export const wikiQuery = graphql`
  query WikiByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      excerpt(pruneLength: 160)
      fields {
        slug
        readingTime {
          text
        }
      }
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        updated(formatString: "MMMM DD, YYYY")
        wikitags
        name
        prerequisites
        wikicategory
        image
        plaindescription
      }
    }
  }
`