
import React from 'react'
import '../styles/Gem.sass'
import gemIcon from '../../../images/icons/gem.svg'

const Gem = ({ text }) => (
  <div className="gem">
    <div className="gem--image-container">
      <img src={gemIcon}/>
    </div>
    <p>{text}</p>
  </div>
)

export default Gem;