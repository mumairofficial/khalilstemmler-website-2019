import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import arrowForward from '../../../images/icons/arrow-forward.svg'
import { StaticQuery, graphql } from "gatsby"
import { getPostsFromQuery } from '../../../utils/blog'
import { ArticleCard } from '../../shared/articles'
import "../styles/RecentArticles.sass"

const RecentArticles = ({ articles }) => (
  <div className="recent-articles-container">
    <h2 className="light-header">recent articles</h2>
    <Link className="navigation-link" to="/articles">view all <img src={arrowForward}/></Link>
    <br/>
    <br/>
    <section className="recent-articles">
      {articles.map((article, i) => (
        <ArticleCard {...article} key={i}/>
      ))}
    </section>
  </div>
)

export default () => (
  <StaticQuery
    query={graphql`
      query RecentArticles {
        categories: allMarkdownRemark(
          filter: { frontmatter: { 
            templateKey: { eq: "blog-post" },
            published: { eq: true }  } }
          limit: 10
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
      console.log(data);
      return (
        <RecentArticles
          articles={getPostsFromQuery(data.posts)}
        />
      )
    }}
  />
)