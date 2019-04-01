import React from 'react'
import PropTypes from 'prop-types'

const Book = ({ title, author, description, category }) => (
  <div>
    <h3>{title}</h3>
    <h5>by {author}</h5>
    <p>{description}</p>
  </div>
)

export default Book;