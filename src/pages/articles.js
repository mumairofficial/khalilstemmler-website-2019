import React from 'react'
import Layout from "../components/shared/layout"
import { StaticQuery, graphql } from "gatsby"
import { 
  ArticlesNavigation, 
  ArticlesContainer 
} from '../components/shared/articles'
import { 
  getCategoriesFromQuery, 
  getPostsFromQuery, 
  getTagsFromQuery 
} from '../utils/blog'

export class Articles extends React.Component {
  constructor (props) {
    super(props);

    this.isCategoryPage = this.isCategoryPage.bind(this);
    this.getActivePageContext = this.getActivePageContext.bind(this);
    this.getArticlePageTitle = this.getArticlePageTitle.bind(this)
    this.getArticlesFromProps = this.getArticlesFromProps.bind(this);
  }

  isCategoryPage () {
    return this.props.isCategoryPage
  }

  getActivePageContext () {
    return this.props.pageContext.category;
  }

  getArticlePageTitle () {
    const articles = this.getArticlesFromProps();
    return this.isCategoryPage() 
      ? `Showing ${articles.length} article(s) about "${this.getActivePageContext()}"`
      : 'All articles'
  }

  getArticlesFromProps () {
    return getPostsFromQuery(this.props.posts);
  }

  render () {
    console.log(this.props)
    const articles = this.getArticlesFromProps();
    const categories = getCategoriesFromQuery(this.props.categories);
    const tags = getTagsFromQuery(this.props.tags);

    return (
      <Layout 
        title="Articles"
        component={<ArticlesNavigation categories={categories}/>}>

          <ArticlesContainer
            titleText={this.getArticlePageTitle()}
            articles={articles}
          />

      </Layout>
    )
  }
}

export default () => (
  <StaticQuery
    query={graphql`
      query Blog {
        categories: allMarkdownRemark(
          filter: { frontmatter: { 
            templateKey: { eq: "blog-post" },
            published: { eq: true }  } }
          limit: 1000
        ) {
          edges {
            node {
              frontmatter {
                category
              }
            }
          }
        }
    
        tags: allMarkdownRemark(
          filter: { frontmatter: { 
            templateKey: { eq: "blog-post" }, 
            published: { eq: true } 
          } }
          limit: 1000
        ) {
          edges {
            node {
              frontmatter {
                tags
              }
            }
          }
        }
    
        posts: allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: {
            frontmatter: {
              templateKey: { eq: "blog-post" }
              published: { eq: true }
            }
          }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
                readingTime {
                  text
                }
              }
              frontmatter {
                title
                date
                description
                tags
                category
                image
              }
            }
          }
        }
      }
    `}
    render={data => {
      return (
        <Articles
          {...data}
        />
      )
    }}
  />
)