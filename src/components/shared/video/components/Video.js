import React from 'react'
import ReactPlayer from 'react-player'
import "../styles/Video.sass"

const Video = ({ url }) => (
  <div className="video-player">
    <ReactPlayer
      url={url}
    />
  </div>
)

export default Video;