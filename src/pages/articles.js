import React from 'react'
import PropTypes from 'prop-types'
import Layout from "../components/shared/layout"
import { StaticQuery, graphql } from "gatsby"
import { 
  ArticleCard, 
  ArticlesNavigation, 
  GhostArticleCard,
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
    this.getActivePageContext = this.getActivePageContext.bind(this)
  }

  isCategoryPage () {
    return this.props.isCategoryPage
  }

  getActivePageContext () {
    return this.props.pageContext.category;
  }

  render () {
    console.log(this.props)
    const articles = getPostsFromQuery(this.props.posts);
    const categories = getCategoriesFromQuery(this.props.categories);
    const tags = getTagsFromQuery(this.props.tags);
    const isCategoryPage = this.props.isCategoryPage;

    return (
      <Layout 
        title="Articles"
        component={<ArticlesNavigation categories={categories}/>}>
          {this.isCategoryPage() ? (
            <div>
              <h3>Showing {articles.length} article(s) about "{this.getActivePageContext()}"</h3>
            </div>
          ) : ''}

          <ArticlesContainer
            titleText={"all articles"}
            // subTitleComponent={}
            articles={articles}
          />

          {/* <section style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around'
          }}>
            {articles.map((article, i) => (
              <ArticleCard {...article} key={i}/>
            ))}
            <GhostArticleCard/>
          </section> */}
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