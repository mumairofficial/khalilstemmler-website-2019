import React from 'react'
import PropTypes from 'prop-types'
import CourseSummary from './CourseSummary';
import "../styles/CourseHeader.sass"
import pic from '../../../images/courses/khalil.png'
import { WistiaEmbed, Video } from '../../shared/video';

const CourseHeader = ({ title, icon, summary, onClick, videoUrl }) => (
  <div className="course-header">
    <div className="inner">
      <CourseSummary
        title={title}
        icon={icon}
        summary={summary}
        onClick={onClick}
        buttonText="Get notified"
      />
      <Video
        url={videoUrl}
      />
      {/* <div className="content-container">
        <img src={pic}/>
      </div> */}
    </div>
  </div>
)

/**
 * https://fast.wistia.com/embed/medias/b18q6825k0/swatch
 */

export default CourseHeader

CourseHeader.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.any.isRequired,
  summary: PropTypes.string.isRequired,
  onClick: PropTypes.any.isRequired
}