import React from 'react'
import "../styles/ArticleTags.sass"

const ArticleTags = ({ tags }) => (
  <div className="article-tags-container">
    { 
      tags
      .map((t) => t.toLowerCase())
      .filter((t) => !!t)
      .map((tag, i) => (
        <div className="article-tag" key={i}>{tag}</div>
      ))
    }
  </div>
)

export default ArticleTags;