import React from 'react'
import PropTypes from 'prop-types'
import ProfilePicture from "./ProfilePicture"
import SocialLinks from './SocialLinks'
import Currently from './Currently'
import me from '../../../images/khalil.jpeg'
import { SolidBookResourceCard } from '../../resources'
import "../styles/Home.sass"

const HomeComponentLeft = () => (
  <div className="home-column-left">
    <div className="intro">
      <div className="intro-card">
        <h1 className="intro-card--name">KHALIL STEMMLER</h1>
      </div>
      <div className="intro-picture-container">
        <img src={me}/>
      </div>
    </div>
    
    <SocialLinks/>
    <Currently/>
    <br/>
    <SolidBookResourceCard/>
  </div>
)

export default HomeComponentLeft;