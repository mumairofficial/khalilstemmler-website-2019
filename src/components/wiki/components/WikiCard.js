import React from 'react'
import PropTypes from 'prop-types'
import { DatePostedAndReadingTime } from '../../shared/date-posted'
import { Tags } from '../../shared/tags'
import { Link } from 'gatsby'
import "../styles/WikiCard.sass"

function getTags (tags, category) {
  let returnTags = [];

  if (tags && tags.length !== 0) {
    returnTags = returnTags.concat(tags);
  }

  returnTags = returnTags.concat(category);

  return returnTags.filter((tag) => !!tag);
}

const WikiCard = (props) => {
  const { 
    name, 
    excerpt,
    updated,
    readingTime,
    slug,
    wikitags,
    wikicategory,
    plaindescription
  } = props;

  const tags = getTags(wikitags, wikicategory)
  return (
    <div className="wiki-card">
      <Link to={slug} className="wiki-card--name">{name}</Link>
      <DatePostedAndReadingTime 
        isUpdatedTime={true}
        date={updated} 
        readingTime={readingTime}
      />
      <Tags tags={tags}/>
      <div className="wiki-card--description">{plaindescription}</div>
    </div>
  )
}

export default WikiCard;