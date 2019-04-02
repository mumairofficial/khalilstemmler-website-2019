import React from 'react'
import PropTypes from 'prop-types'
import Layout from "../components/shared/layout"
import { StaticQuery, graphql } from "gatsby"
import { WikiContainer } from '../components/wiki'
import { getWikisFromQuery } from '../utils/wiki'

class Wiki extends React.Component {
  constructor (props) {
    super(props);

    this.getWikis = this.getWikis.bind(this);
  }

  getWikis = () => {
    const { wikis } = this.props;
    return getWikisFromQuery(wikis);
  }

  render () {
    const wikis = this.getWikis();

    return (
      <Layout 
        title="Wiki"
        seo={{
          title: 'Wiki',
          keywords: ['software design', 'software principles', 'architecture']
        }}>
        <WikiContainer wikis={wikis}/>
      </Layout>
    )
  }
}

export default () => (
  <StaticQuery
    query={graphql`
      query Wiki {    
        wikis: allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___updated] }
          filter: {
            frontmatter: {
              templateKey: { eq: "wiki" }
              published: { eq: true }
            }
          }
          limit: 1000
        ) {
          edges {
            node {
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
        }
      }
    `}
    render={data => {
      console.log(data)
      return (
        <Wiki
          {...data}
        />
      )
    }}
  />
)