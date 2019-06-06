import React from 'react'
import PropTypes from 'prop-types'
import "../styles/CourseOutline.sass"

const CourseOutline = ({ outline }) => (
  <div className="course-outline">
    <div className="inner">
      <h2>Course outline</h2>
      {outline.map((moduleItem, i) => (
        <div className="module">
          <p className="module-title">{moduleItem.module}</p>
          <div className="module-items-container">
            {moduleItem.items.map((item, j) => (
              <p key={j}>{item}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
)

export default CourseOutline;

CourseOutline.propTypes = {
  outline: PropTypes.arrayOf(PropTypes.shape({
    module: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
  })).isRequired
}