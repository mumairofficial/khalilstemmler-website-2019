import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'
import "../styles/BooksContainer.sass"

const BooksCategoryContainer = ({ category, books }) => (
  <>
    <h3>{category}</h3>
    <hr/>
    { books
        .filter((book) => book.category === category)
        .map((book, i) => (
        <Book key={i} {...book}/>
      ))}
  </>
)

const BooksContainer = ({ books }) => (
  <div className="books-container">
    <BooksCategoryContainer category="Development" books={books} />
    <BooksCategoryContainer category="Lifestyle" books={books} />
    <BooksCategoryContainer category="Productivity" books={books} />
  </div>
)

export default BooksContainer;