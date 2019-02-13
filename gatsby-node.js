/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const bootstrapBlog = require('./bootstrap/bootstrap-blog');

exports.createPages = async ({ actions, graphql }) => {
  await bootstrapBlog.createPages(actions, graphql);
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  bootstrapBlog.onCreateNode(node, actions, getNode)
}

exports.sourceNodes = async ({ actions }) => {

}