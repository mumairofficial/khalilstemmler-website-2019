

export function getBooksFromQuery (books) {
  if (books) {
    return books.edges
      .map(edge => edge.node)
      .map(node => Object.assign({}, node.frontmatter, node.fields))
  }
  return []
}