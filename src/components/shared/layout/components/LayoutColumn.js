import React from 'react'
import PropTypes from 'prop-types'

const LayoutColumn = ({ children, index }) => (
  <section className={`layout-card-${index}`}>{children}</section>
)

export default LayoutColumn;

LayoutColumn.propTypes = {
  children: PropTypes.any
}