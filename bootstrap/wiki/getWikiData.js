
module.exports = (graphql) => {
  return graphql(`
    {
      allMarkdownRemark(
        filter: { 
          frontmatter: { 
            templateKey: { eq: "wiki" },
          }
        }
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
  `)
}