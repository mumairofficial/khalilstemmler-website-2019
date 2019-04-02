import React from 'react'
import PropTypes from 'prop-types'
import ReactDisqusComments from 'react-disqus-comments'
import { DatePostedAndReadingTime } from '../../shared/date-posted'
import HTMLContent from '../../shared/HTMLContent'
import "../styles/Wiki.sass"

class Wiki extends React.Component {
  constructor (props) {
    super(props);
    this.getUniquePageIdentifier = this.getUniquePageIdentifier.bind(this);
  }

  getUniquePageIdentifier() {
    return typeof window !== 'undefined' && window.location.href
      ? typeof window !== 'undefined' && window.location.href
      : 'https://khalilstemmler.com'
  }

  render () {
    console.log(this.props)
    const { props } = this;
    const { name, plaindescription, prerequisites, html, image, updated, wikicategory, readingTime, wikitags, excerpt, slug } = props;
    return (
      <div className="wiki">
        <h1 className="wiki-title">{name}</h1>
        <DatePostedAndReadingTime isUpdatedTime={true} date={updated} readingTime={readingTime}/>
        <blockquote>
          <p>{plaindescription}</p>
        </blockquote>
        <p>Coming soon!~</p>
        {/* <HTMLContent content={html}/> */}
        <ReactDisqusComments
          shortname="khalilstemmler-com"
          identifier={this.getUniquePageIdentifier()}
          title={name}
          url={this.getUniquePageIdentifier()}
        />
      </div>
    )
  }
}

export default Wiki;