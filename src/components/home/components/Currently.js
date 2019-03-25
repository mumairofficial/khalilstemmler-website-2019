import React from 'react'
import PropTypes from 'prop-types'
import Reading from '../../../images/currently/reading.png'
import Spinning from '../../../images/currently/spinning.png'
import "../styles/Currently.sass"
import prose from '../../../assets/prose'

const CurrentMusic = () => (
  <div className="current-activity music">
    <img src={Spinning}></img>
    <div>Spinning "{prose.currently.music.album}" by {prose.currently.music.artist}</div>
  </div>
)

const CurrentBook = () => (
  <div className="current-activity book">
    <img src={Reading}></img>
    <div>Reading "{prose.currently.book.title}" by {prose.currently.book.author}</div>
  </div>
)

const Currently = () => (
  <div className="currently">
    <div className="title">Currently</div>
    <CurrentMusic/>
    <CurrentBook/>
  </div>
)

export default Currently;