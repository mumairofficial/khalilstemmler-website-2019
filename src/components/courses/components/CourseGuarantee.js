import React from 'react'
import PropTypes from 'prop-types'
import "../styles/CourseGuarantee.sass"

const CourseGuarantee = ({ text }) => (
  <div className="course-guarantee">
    <div className="inner">{text}</div>
  </div>
)

export default CourseGuarantee;