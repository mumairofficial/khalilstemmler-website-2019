import React from 'react'
import PropTypes from 'prop-types'
import "../styles/CTA.sass"
import { SubmitButton } from '../../shared/buttons';

const CTA = ({ onClick, text, image }) => (
  <div className="cta">
    <div className='inner'>
      <div>
        <h3>{text}</h3>
        { image ? <img src={image}/> : '' }
      </div>
      
      <SubmitButton text="Get notified" color="green" onClick={onClick}/>
      
    </div>
  </div>
)

export default CTA;

CTA.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}