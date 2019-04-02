import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from "gatsby"
import Layout from "../components/shared/layout"

const WikiPost = (props) => {
  console.log(props)
  return (
    <div>
      <div>wiki post</div>
      <div>{JSON.stringify(props)}</div>
    </div>
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
      }
    }
  }
`