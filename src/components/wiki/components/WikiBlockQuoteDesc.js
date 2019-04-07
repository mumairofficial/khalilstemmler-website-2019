import React from 'react'
import "../styles/WikiBlockQuoteDesc.sass"

const WikiBlockQuoteDesc = ({ description }) => (
  <>
  <p><i className="fas fa-info-circle"></i> About this...</p>
  <blockquote className="wiki-block-quote-desc">
    <p>{description}</p>
  </blockquote>
  </>
)

export default WikiBlockQuoteDesc;