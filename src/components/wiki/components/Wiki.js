import React from 'react'
import PropTypes from 'prop-types'
import ReactDisqusComments from 'react-disqus-comments'
import { DatePostedAndReadingTime } from '../../shared/date-posted'
import HTMLContent from '../../shared/HTMLContent'
import WikiBlockQuoteDesc from './WikiBlockQuoteDesc'
import { Feedback } from '../../../components/feedback'
import { SubscribeForm } from '../../../components/subscribe'
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
    const { props } = this;
    const { name, plaindescription, prerequisites, html, image, updated, wikicategory, readingTime, wikitags, excerpt, slug } = props;
    return (
      <div className="wiki">
        <h1 className="wiki-title">{name}</h1>
        <DatePostedAndReadingTime isUpdatedTime={true} date={updated} readingTime={readingTime}/>
        { image && <img className="wiki-image" src={image}/> }
        <WikiBlockQuoteDesc description={plaindescription}/>
        <br/>
        <hr/>
        <br/>
        <div className="wiki-content">
          <HTMLContent content={html}/>
        </div>
        <SubscribeForm/>
        <ReactDisqusComments
          shortname="khalilstemmler-com"
          identifier={this.getUniquePageIdentifier()}
          title={name}
          url={this.getUniquePageIdentifier()}
        />
        <a href="/resources/solid-nodejs-architecture">
          <img src="/img/resources/solid-book/insert-3.png"/>
        </a>
      </div>
    )
  }
}

export default Wiki;