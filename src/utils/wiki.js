
export function getWikisFromQuery (wikis) {
  if (wikis) {
    return wikis.edges
      .map(edge => edge.node)
      .map(node => Object.assign({}, node.frontmatter, node.fields, { 
        excerpt: node.excerpt,
        html: node.html
      }))
  }

  return []
}