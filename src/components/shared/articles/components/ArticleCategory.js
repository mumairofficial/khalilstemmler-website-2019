
import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import { Link } from 'gatsby'

const ArticleCategory = ({ category }) => (
  <Link className="article-category" to={`/articles/categories/${kebabCase(category)}`}>{category}</Link>
)

export default ArticleCategory;

ArticleCategory.propTypes = {
  category: PropTypes.string.isRequired
}

