import React from 'react'
import PropTypes from 'prop-types'
import "../styles/Article.sass"
import HTMLContent from '../../../shared/HTMLContent'
import DatePostedAndReadingTime from './DatePostedAndReadingTime'
import ReactDisqusComments from 'react-disqus-comments'
import { kebabCase } from 'lodash'
import { Link } from 'gatsby'
import AboutTheAuthor from './AboutTheAuthor'
import AuthorCredit from './AuthorCredit'
import Authors from '../constants/AuthorConstants'
import ArticleTags from './ArticleTags'
import ArticleDescription from './ArticleDescription'
import SimilarArticles from './SimilarArticles'

class Article extends React.Component {
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
    const props = this.props;
    const { title, html, image, date, category, readingTime, tags, description, slug } = props;
    return (
      <section className="article-container">
        <h1 className="article-title">{title}</h1>
        <Link className="article-category" to={`/articles/categories/${kebabCase(category)}`}>{category}</Link>
        <DatePostedAndReadingTime date={date} readingTime={readingTime}/>
        <ArticleTags tags={tags}/>
        <ArticleDescription description={description}/>
        <AuthorCredit author={Authors.khalil}/>
        
        <br/>
        <img src={image}/>
        <HTMLContent content={html}/>
        <AboutTheAuthor {...Authors.khalil}/>
        <ReactDisqusComments
          shortname="khalilstemmler-com"
          identifier={this.getUniquePageIdentifier()}
          title={title}
          url={this.getUniquePageIdentifier()}
        />
        <SimilarArticles category={category} tags={tags} currentArticleSlug={slug}/>
        
      </section>
    )
  }
}

export default Article;

Article.propTypes = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string,
  date: PropTypes.string.isRequired,
  category: PropTypes.string,
  description: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  html: PropTypes.string
}