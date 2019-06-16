import React from 'react'
import GitHubButton from 'react-github-btn'
import "../styles/SocialLinks.sass"

class SocialLinks extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      widgetsLoaded: false
    }

    this.loadWidgets = this.loadWidgets.bind(this);
  }
  
  loadWidgets () {
    const { widgetsLoaded } = this.state;
    
    const twitterWidgetFunctionPresent = (
      typeof window !== 'undefined' && 
      typeof window.twttr && 
      window.twttr.widgets !== 'undefined'
    );

    try {
      if (!widgetsLoaded) {
        if (twitterWidgetFunctionPresent) {
          window.twttr.widgets.load()
          this.setState({ ...this.state, widgetsLoaded: true })
          return;
        }
      }
    } catch (err) {
      console.log(err);
    }

    setTimeout(() => this.loadWidgets(), 50)
  }

  componentDidMount () {
    this.loadWidgets();
  }

  render () {
    return (
      <div className="social-links">
        <a 
          href="https://twitter.com/stemmlerjs" 
          class="twitter-follow-button" 
          data-size="large"
          data-show-count="false"
        >
            Follow @stemmlerjs
        </a>
        <GitHubButton
          href="https://github.com/stemmlerjs"
          data-size="large"
          // data-show-count="true"
          aria-label="Follow @stemmlerjs on GitHub"
        >
          Follow
        </GitHubButton>
      </div>
    )
  }
}

export default SocialLinks;