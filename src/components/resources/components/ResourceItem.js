
import React from 'react'
import { Link } from 'gatsby'
import "../styles/ResourceItem.sass"

const ResourceItem = ({ name, description, image, url, contentType }) => (
  <Link to={url} className="resource-item">
    <div className="resource-item--image-container">
      <img src={image} />
    </div>
    <div>
      <h2>{name}</h2>
      <span>{contentType}</span>
      <p>{description}</p>
    </div>
  </Link>
)

export default ResourceItem;
