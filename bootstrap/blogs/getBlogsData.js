
module.exports = (graphql) => {
  return graphql(`
    {
      allMarkdownRemark(
        filter: { 
          frontmatter: { 
            templateKey: { eq: "blog-post" },
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