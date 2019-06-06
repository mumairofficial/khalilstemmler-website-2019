import React from 'react'
import PropTypes from 'prop-types'
import "../styles/CourseProject.sass"

const CourseProject = ({ children }) => (
  <div className="course-project">
    <div className="inner">
      <h2 className="special-green">What you'll build</h2>
      { children }
    </div>
  </div>
)

export default CourseProject;

