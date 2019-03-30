import React from 'react'
import sunLightSvg from '../../../images/dark-mode/sun-light.svg'
import sunDarkSvg from '../../../images/dark-mode/sun-dark.svg'
import "../styles/DarkModeToggle.sass"

const DarkModeToggle = ({ darkModeEnabled, onClick }) => (
  <div onClick={onClick} className="dark-mode-toggle-switch">
    {darkModeEnabled ? (
      <img src={sunLightSvg}/>
    ) : (
      <img src={sunDarkSvg}/>
    )}
  </div>
)

export default DarkModeToggle;