import React from 'react'
import PropTypes from 'prop-types'
import "../styles/ShareButtons.sass"

class ShareButtons extends React.Component {
  constructor (props) {
    super(props);

    this.state = {}

    this.createTwitterShareURL = this.createTwitterShareURL.bind(this);
  }

  createTwitterShareURL = () => {
    const title = this.props.title;
    const url = this.props.url;

    const twitterShare = `http://twitter.com/share?text=${encodeURIComponent(title)}&url=${url}/&via=stemmlerjs`

    return twitterShare;
  }

  render () {
    return (
      <div className="share-buttons">
        <a class="button twitter-button" href={this.createTwitterShareURL()} target="_blank">Share on Twitter</a>
      </div>
    )
  }
}

export default ShareButtons;

ShareButtons.propTypes = {
  url: PropTypes.string.isRequired
}