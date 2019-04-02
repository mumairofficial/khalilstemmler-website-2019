import React from 'react'
import PropTypes from 'prop-types'
import WikiCard from './WikiCard'
import "../styles/WikiContainer.sass"

const WikiContainer = ({ wikis }) => (
  <div className="wiki-container">
    { wikis.map((wiki) => (
      <WikiCard {...wiki}/>
    ))}
  </div>
)

export default WikiContainer;

