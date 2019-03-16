import React from 'react'
import PropTypes from 'prop-types'
import ProfilePicture from "./ProfilePicture"
import SocialLinks from './SocialLinks'
import "../styles/Home.sass"

const HomeComponentLeft = () => (
  <div className="home-column-left">
    <div className="intro-card">
      <h1 className="intro-card--name">KHALIL STEMMLER</h1>
    </div>
    <div 
      style={{ 
        maxWidth: `300px`, 
        marginBottom: `1.45rem`, 
        marginTop: `1.45rem` 
      }}>
      <ProfilePicture/>
    </div>
    <SocialLinks/>
  </div>
)

export default HomeComponentLeft;