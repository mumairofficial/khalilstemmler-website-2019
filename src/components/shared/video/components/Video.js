import React from 'react'
import ReactPlayer from 'react-player'

const Video = ({ url }) => (
  <div className="video-player">
    <ReactPlayer
      url={url}
    />
  </div>
)

export default Video;