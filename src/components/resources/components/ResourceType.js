
import React from 'react'
import PropTypes from 'prop-types'
import mysteryIcon from '../../../images/icons/mystery-icon.svg'
import "../styles/ResourceType.sass"

export const ResourceTypeConstant = {
  ebook: 'ebook'
}

// TODO: When we add more resources, we can utilize this component
// better.

const ResourceType = ({ type, text }) => (
  <div className="resource-type">
    <div className="resource-type--image-container">
      <img src={mysteryIcon}/>
    </div>
    <p>Free ebook</p>
  </div>
)

export default ResourceType;