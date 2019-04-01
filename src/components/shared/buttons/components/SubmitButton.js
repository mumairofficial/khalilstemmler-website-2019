import React from 'react'
import PropTypes from 'prop-types'
import "../styles/SubmitButton.sass"

const SubmitButton = ({ text, icon, onClick }) => (
  <div className="submit-button" onClick={onClick}>
    {text}
  </div>
)

export default SubmitButton;

SubmitButton.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.string,
  onClick: PropTypes.func.isRequired
}