import React from 'react'
import PropTypes from 'prop-types'
import "../styles/Article.sass"
import HTMLContent from '../../../shared/HTMLContent'
import { DatePostedAndReadingTime } from '../../date-posted'
import ReactDisqusComments from 'react-disqus-comments'
import { kebabCase } from 'lodash'
import { Link } from 'gatsby'
import AboutTheAuthor from './AboutTheAuthor'
import AuthorCredit from './AuthorCredit'
import Authors from '../constants/AuthorConstants'
import { Tags } from '../../tags'
import ArticleDescription from './ArticleDescription'
import SimilarArticles from './SimilarArticles'
import { SubscribeForm } from '../../../subscribe';
import ArticleCategory from './ArticleCategory'
import { ShareButtons } from '../../share-buttons';

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
    const props = this.props;
    const { title, html, image, date, category, readingTime, tags, description, slug } = props;
    return (
      <section className="article-container">
        <h1 className="article-title">{title}</h1>
        <ArticleCategory category={category}/>
        <DatePostedAndReadingTime date={date} readingTime={readingTime}/>
        <Tags tags={tags}/>
        <ArticleDescription description={description}/>
        <AuthorCredit author={Authors.khalil}/>
        
        <br/>
        <img src={image}/>
        <HTMLContent content={html}/>

        <ShareButtons
          url={`https://khalilstemmler.com${slug}`}
          title={title}
        />
        <br/>

        <h3>Stay in touch!</h3>
        <SubscribeForm
          message={`Like the posts you see here? Sign up to get notified about new ones.`}
        />
        <br/>
        <br/>
        <AboutTheAuthor {...Authors.khalil}/>
        <div>View more in <Link to={`/articles/categories/${kebabCase(category)}`}>{category}</Link></div>
        
        <br/>
        {/* <ReactDisqusComments
          shortname="khalilstemmler-com"
          identifier={this.getUniquePageIdentifier()}
          title={title}
          url={this.getUniquePageIdentifier()}
        /> */}
        <a href="/resources/solid-nodejs-architecture">
          <img src="/img/resources/solid-book/insert-3.png"/>
        </a>
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