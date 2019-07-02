/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const bootstrapArticles = require('./bootstrap/bootstrap-articles');
const bootstrapWiki = require('./bootstrap/bootstrap-wiki');

exports.createPages = async ({ actions, graphql }) => {
  await bootstrapArticles.createPages(actions, graphql);
  await bootstrapWiki.createPages(actions, graphql);
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  bootstrapArticles.onCreateNode(node, actions, getNode);
  bootstrapWiki.onCreateNode(node, actions, getNode);
}