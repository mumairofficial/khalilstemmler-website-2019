import React from 'react'
import PropTypes from 'prop-types'
import "../styles/ShareButtons.sass"
import { 
  createTwitterShareURL, 
  createTwitterDiscussionURL 
} from '../../../../utils/social';

class ShareButtons extends React.Component {
  constructor (props) {
    super(props);

    this.state = {}
  }

  render () {
    const { title, url } = this.props;
    const shareUrl = createTwitterShareURL(title, url);
    const discussionUrl = createTwitterDiscussionURL(url);

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