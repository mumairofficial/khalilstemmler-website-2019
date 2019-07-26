import React from 'react'
import PropTypes from 'prop-types'
import SocialLinks from '../../../home/components/SocialLinks'
import "../styles/AboutTheAuthor.sass"

const AboutTheAuthor = ({ name, about, image, description }) => (
  <>
  <div className="about-the-author">
    <div className="about-the-author--image-container">
      <img src={image}/>
    </div>
    <div className="about-the-author--content-container">
      <h3>About the author</h3>
      <div className="about-the-author--description">
        <h4>{name}</h4>
        <div>{description}</div>
      </div>
      <br/>
      <SocialLinks 
        github={{ showDataCount: true }}
        twitter={{ showDataCount: true }}
      />
    </div>
  </div>
  <br/>
  <hr/>
  </>
)

export default AboutTheAuthor;