
import React from 'react'
import ResourceCard from './ResourceCard'
import solidGreen from '../../../images/resources/solid/solid-green.png'

const SolidBookResourceCard = () => (
  <ResourceCard
    image={solidGreen}
    smallTitle={`🚨 I'm writing a book! 📗`}
    title={`Introduction to software architecture 
    & design principles with Node.js and TypeScript`}
    buttonText={"Get the free ebook"}
    onButtonClick={() => {
      if (typeof window !== undefined) {
        window.location.href = '/resources/solid-nodejs-architecture'
      }
    }}
  >
  </ResourceCard>
)

export default SolidBookResourceCard;