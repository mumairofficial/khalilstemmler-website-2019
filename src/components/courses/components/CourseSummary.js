import React from 'react'
import PropTypes from 'prop-types'
import "../styles/CourseSummary.sass"
import { SubmitButton } from '../../shared/buttons';

const CourseSummary = ({ title, icon, summary, onClick, buttonText }) => (
  <div className="course-summary-container">
    <div className="course-summary">
      <div className="icon-container">
        <img src={icon}/>
      </div>
      <div className="course-summary-details">
        <div className="type">A premium course by Khalil Stemmler</div>
        <h1>{title}</h1>
        <p>{summary}</p>
        <SubmitButton color="green" text={buttonText} onClick={onClick}/>
      </div>
    </div>
  </div>
)

export default CourseSummary;

CourseSummary.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.any.isRequired,
  summary: PropTypes.any.isRequired,
  onClick: PropTypes.func.isRequired,
  buttonText: PropTypes.func.isRequired
}