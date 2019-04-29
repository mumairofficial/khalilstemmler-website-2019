import React from 'react'
import PropTypes from 'prop-types'
import "../styles/SubmitButton.sass"
import { ClipLoader } from "react-spinners";

const SubmitButton = ({ text, icon, onClick, loading }) => (
  <div className="submit-button" onClick={onClick}>
    {loading ? <ClipLoader color={"#53a7d8"} loading={true} /> : text}
  </div>
)

export default SubmitButton;

SubmitButton.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.string,
  onClick: PropTypes.func.isRequired
}