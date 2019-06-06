import React from 'react'
import PropTypes from 'prop-types'
import "../styles/LearningBenefits.sass"
import { Gem } from '../../resources'

const LearningBenefits = ({ benefits }) => (
  <div className="learning-benefits">
    <div className="inner">
      <h2 className="special-green">What you'll learn</h2>
      <div className="benefits-list">
      { benefits.map((g, i) => (<Gem key={i} text={g}/>)) }
      </div>
    </div>
  </div>
)

export default LearningBenefits;

LearningBenefits.propTypes = {
  benefits: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
}