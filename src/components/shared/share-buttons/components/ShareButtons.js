import React from 'react'
import PropTypes from 'prop-types'
import "../styles/ShareButtons.sass"

class ShareButtons extends React.Component {
  constructor (props) {
    super(props);

    this.state = {}

    this.createTwitterShareURL = this.createTwitterShareURL.bind(this);
    this.createTwitterDiscussionURL = this.createTwitterDiscussionURL.bind(this);
  }

  createTwitterShareURL = () => {
    const title = this.props.title;
    const url = this.props.url;
    return `http://twitter.com/share?text=${encodeURIComponent(title)}&url=${url}/&via=stemmlerjs`
  }

  createTwitterDiscussionURL = () => {
    const url = this.props.url;
    return `https://twitter.com/search?q=${url}`
  }

  render () {
    const shareUrl = this.createTwitterShareURL();
    const discussionUrl = this.createTwitterDiscussionURL();

    return (
      <div className="share-buttons">
        <a class="button twitter-button" href={shareUrl} target="_blank">Share on Twitter</a>
        <a class="button twitter-button" href={discussionUrl} target="_blank">Discussion on Twitter</a>
      </div>
    )
  }
}

export default ShareButtons;

ShareButtons.propTypes = {
  url: PropTypes.string.isRequired
}