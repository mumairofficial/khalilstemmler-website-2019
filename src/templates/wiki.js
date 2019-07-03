import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from "gatsby"
import Layout from "../components/shared/layout"
import { Wiki } from '../components/wiki'
import { PageType } from '../components/shared/seo/PageType';

const WikiPost = (props) => {
  const { markdownRemark } = props.data
  const { fields, frontmatter, html, excerpt } = markdownRemark;
  const { slug } = fields;
  const {
    name,
    wikitags,
    wikicategory,
    image,
    date,
    updated
  } = frontmatter;
 
  let seoTags = wikitags ? wikitags : [];
  seoTags = seoTags.concat(wikicategory);
  
  return (
    <Layout
      seo={{
        title: `${name}`,
        keywords: seoTags,
        description: excerpt,
        image: image ? image : null,
        pageType: PageType.ARTICLE,
        datePublished: date,
        dateModified: updated,
        slug
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
        date
        updated
        wikitags
        name
        templateKey
        prerequisites
        wikicategory
        image
        plaindescription
      }
    }
  }
`