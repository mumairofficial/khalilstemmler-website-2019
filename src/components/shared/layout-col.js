import React from 'react'
import PropTypes from 'prop-types'

const LayoutCol = ({ children }) => (
  <section className="layout-card">{children}</section>
)

export default LayoutCol;

LayoutCol.propTypes = {
  children: PropTypes.any
}