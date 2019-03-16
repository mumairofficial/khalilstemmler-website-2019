import React from 'react'
import PropTypes from 'prop-types'

const LayoutColumn = ({ children }) => (
  <section className="layout-card">{children}</section>
)

export default LayoutColumn;

LayoutColumn.propTypes = {
  children: PropTypes.any
}