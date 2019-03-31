import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import timeIcon from '../../../../images/icons/time.svg'
import timeDarkMode from '../../../../images/icons/time-dark.svg'
import "../styles/DatePostedAndReadingTime.sass"

const DatePostedAndReadingTime = ({ date, readingTime }) => (
  <div className="date-posted">
    <img className="date-posted--light-mode" src={timeIcon}/>
    <img className="date-posted--dark-mode" src={timeDarkMode}/>
    <div>{moment(date).format('MMMM Do, YYYY')}, {readingTime.text}</div>
  </div>
)

export default DatePostedAndReadingTime;

DatePostedAndReadingTime.propTypes = {
  date: PropTypes.string.isRequired,
  readingTime: PropTypes.shape({
    text: PropTypes.string.isRequired
  }).isRequired
}
