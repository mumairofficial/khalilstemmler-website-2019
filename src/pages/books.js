import React from 'react'
import PropTypes from 'prop-types'
import Layout from "../components/shared/layout"
import { StaticQuery, graphql } from "gatsby"
import { getBooksFromQuery } from '../utils/book'
import { BooksContainer } from '../components/books'

const Books = ({ books }) => (
  <Layout 
    seo={{
      title: 'Books',
      keywords: []
    }}
    title="Books">
    {/* <BooksContainer books={books} /> */}
    <h3>👷🚧 Under construction 👷🚧</h3>
    <p>If you know me at all, you know that I'm obsessed with books on 
      software and self-improvement.
    </p>
    <p>
      Books have some of the greatest return on investment ever.
    </p>
    <p>
      In fact, a lot of what I write about are things I've distilled from books and from 
      the experience I've had implementing things I've read from books.
    </p>
    <p>I plan on making this page a space where I can recommend books that I feel
      personally helped me with respect to Design, Development, Lifestyle and Productivity 
      as a developer.
    </p>
    <hr/>
    <p>If you're a Junior Developer, I wrote an article on the <a href="https://medium.freecodecamp.org/9-books-for-junior-developers-in-2019-e41fc7ecc586">Top 9 books for
     Junior Developer in 2019</a>. It includes a bunch of books that I wish I had read earlier because they really helped me get up to speed on the essentials of professional software development.</p>
  </Layout>
)

export default () => (
  <StaticQuery
    query={graphql`
      query Books {    
        books: allMarkdownRemark(
          filter: {
            frontmatter: {
              templateKey: { eq: "book" }
            }
          }
          limit: 1000
        ) {
          edges {
            node {
              frontmatter {
                title
                description
                category
                author
              }
            }
          }
        }
      }
    `}
    render={data => {
      return (
        <Books
          books={getBooksFromQuery(data.books)}
        />
      )
    }}
  />
)