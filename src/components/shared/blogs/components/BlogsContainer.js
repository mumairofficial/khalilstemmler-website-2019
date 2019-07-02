import React from 'react'
import '../styles/BlogsContainer.sass'

const BlogsContainer = ({ titleText, subTitleComponent }) => (
  <div className="blogs-container">
    <h2 className="light-header">{titleText}</h2>
    { subTitleComponent ? subTitleComponent : ''}
    <br/>
    <br/>
  </div>
)

export default BlogsContainer;