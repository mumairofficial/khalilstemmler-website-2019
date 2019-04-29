
import React from 'react'
import "../styles/FaqItem.sass"

const FaqItem = ({ question, answer }) => (
  <div className="faq-item">
    <h4>{question}</h4>
    <p>{answer}</p>
  </div>
)

export default FaqItem;

