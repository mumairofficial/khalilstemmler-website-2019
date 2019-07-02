
module.exports = (graphql) => {
  return graphql(`
    {
      allMarkdownRemark(
        filter: { 
          frontmatter: { 
            templateKey: { eq: "article" },
          }
        }
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              tags
              category
              templateKey
            }
          }
        }
      }
    }
  `)
}