import React from 'react'
import PropTypes from 'prop-types'
import "../styles/AuthorCredit.sass"

const AuthorCredit = ({ author }) => (
  <div className="author-credit">
    <div className="author-credit--image-container">
      <img src={author.image}/>
    </div>
    <div className="author-credit--author">by <a href={author.about}>{author.name}</a></div>
  </div>
)

export default AuthorCredit;

AuthorCredit.propTypes = {
  name: PropTypes.string.isRequired,
  about: PropTypes.string.isRequired,
  image: PropTypes.string
}