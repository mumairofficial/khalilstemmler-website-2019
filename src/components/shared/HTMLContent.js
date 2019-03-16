import React from 'react'
import PropTypes from 'prop-types'

const HTMLContent = ({ content, className }) => (
  <div className={className} dangerouslySetInnerHTML={{ __html: content }} />
)

export default HTMLContent;

HTMLContent.propTypes = {
  content: PropTypes.any,
  className: PropTypes.string
}