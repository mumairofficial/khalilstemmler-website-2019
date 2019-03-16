import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import timeIcon from '../../../../images/icons/time.svg'

const DatePosted = ({ date }) => (
  <div className="date-posted">
    <img src={timeIcon}/>
    <div>{moment(date).format('MMMM Do, YYYY')}</div>
  </div>
)

export default DatePosted;

DatePosted.propTypes = {
  date: PropTypes.string.isRequired
}
