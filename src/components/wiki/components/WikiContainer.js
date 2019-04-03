import React from 'react'
import PropTypes from 'prop-types'
import WikiCard from './WikiCard'
import "../styles/WikiContainer.sass"

const WikiContainer = ({ wikis, titleText, subTitleComponent }) => (
  <div className="wiki-container">
    { titleText && <h2 className="light-header">{titleText}</h2>}
    { subTitleComponent ? subTitleComponent : ''}
    { titleText && (
      <>
        <br/>
        <br/>
      </>
    )}
    <section className="wikis">
      { wikis.map((wiki) => (
        <WikiCard {...wiki}/>
      ))}
    </section>
  </div>
)

export default WikiContainer;

