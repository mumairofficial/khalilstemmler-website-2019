import React from 'react'
import PropTypes from 'prop-types'
import CourseSummary from './CourseSummary';
import "../styles/CourseHeader.sass"
import pic from '../../../images/courses/khalil.png'

const CourseHeader = ({ title, icon, summary, onClick }) => (
  <div className="course-header">
    <div className="inner">
      <CourseSummary
        title={title}
        icon={icon}
        summary={summary}
        onClick={onClick}
        buttonText="Get notified"
      />
      {/* <div className="content-container">
        <img src={pic}/>
      </div> */}
    </div>
  </div>
)

export default CourseHeader

CourseHeader.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.any.isRequired,
  summary: PropTypes.string.isRequired,
  onClick: PropTypes.any.isRequired
}