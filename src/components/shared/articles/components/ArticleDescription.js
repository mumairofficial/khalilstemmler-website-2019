import React from 'react'
import PropTypes from 'prop-types'
import HTMLContent from '../../../shared/HTMLContent'
import "../styles/ArticleDescription.sass"

const ArticleDescription = ({ description }) => (
  <p className="article-description">
    <HTMLContent content={description}/>
  </p>
)

export default ArticleDescription;