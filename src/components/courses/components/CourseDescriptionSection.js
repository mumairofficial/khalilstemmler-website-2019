import React from 'react'
import PropTypes from 'prop-types'
import "../styles/CourseDescriptionSection.sass"

const CourseDescriptionSection = ({ children }) => (
  <div className="course-description-section">
    <div className="inner">
    {children}
    </div>
  </div>
)

export default CourseDescriptionSection;