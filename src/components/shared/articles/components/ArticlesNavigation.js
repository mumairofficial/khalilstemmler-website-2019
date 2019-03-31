import React from 'react'
import PropTypes from 'prop-types'
import "../styles/ArticlesNavigation.sass"
import { Link } from 'gatsby'
import { kebabCase } from 'lodash'

const ArticlesNavigation = ({ categories }) => (
  <div className="categories">
    <div className="categories--parent-category">Topics</div>
    <Link to="/articles">All</Link>
    {categories.map((category, i) => (
      <Link to={`/articles/categories/${kebabCase(category)}`} key={i}>{category}</Link>
    ))}
  </div>
)

export default ArticlesNavigation;

ArticlesNavigation.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired
}
