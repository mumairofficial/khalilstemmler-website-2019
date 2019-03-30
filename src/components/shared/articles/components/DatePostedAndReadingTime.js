import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import timeIcon from '../../../../images/icons/time.svg'

const DatePostedAndReadingTime = ({ date, readingTime }) => (
  <div className="date-posted">
    <img src={timeIcon}/>
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
