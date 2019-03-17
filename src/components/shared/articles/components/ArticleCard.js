import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import DatePosted from './DatePosted'
import "../styles/ArticleCard.sass"
import { makeElipsedText } from '../../../../utils/blog'

export const GhostArticleCard = () => (
  <div style={{ height: '0px' }} className="article-card"></div>
)

const ArticleCard = (props) => {
  const {
    title,
    image,
    slug,
    date,
    category,
    description,
    tags
  } = props;
  return (
    <div className="article-card">
      <Link to={slug} className="article-card--image-container">
        <img src={image}/>
      </Link>
      <div className="article-card--content">
        <DatePosted date={date}/>
        <Link to={slug} className="article-card--title">{title}</Link>
        <div className="article-card--description">{makeElipsedText(description, 130)}</div>
      </div>
    </div>
  )
}

export default ArticleCard;

ArticleCard.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string,
  slug: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  category: PropTypes.string,
  description: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired
}

