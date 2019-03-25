import React from 'react'
import PropTypes from 'prop-types'

const LayoutColumn = ({ children, index, hasContent, checkContent }) => (
  <section className={`layout-card layout-card-${index} 
    ${checkContent && !hasContent ? 'no-content' : ''}`}>{children}</section>
)

export default LayoutColumn;

LayoutColumn.propTypes = {
  children: PropTypes.any
}