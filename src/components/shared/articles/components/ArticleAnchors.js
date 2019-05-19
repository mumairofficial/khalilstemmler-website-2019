import React from 'react'
import PropTypes from 'prop-types'
import "../styles/ArticleAnchors.sass"

class ArticleAnchors extends React.Component {
  constructor (props) {
    super(props);
  }

  getNameFromAnchor (anchor) {
    return this.getLinkFromAnchor(anchor)
      .split('-')
      .map((word) => word.substring(0,1).toUpperCase() + word.substring(1))
      .join(' ')
  }

  getLinkFromAnchor (anchor) {
    return anchor.getAttribute('name')
  }

  render () {
    const { anchors, message } = this.props;
    if (anchors.length === 0) return <div/>;

    return (
      <div className="article-anchors">
        <div className="message" dangerouslySetInnerHTML={{ __html: message}}></div>
        { anchors.map((anchor, i) => (
          <a className="anchor-link" href={`#${this.getLinkFromAnchor(anchor)}`} key={i}>{this.getNameFromAnchor(anchor)}</a>
        ))}
      </div>
    )
  }
}

export default ArticleAnchors;

ArticleAnchors.propTypes = {
  anchors: PropTypes.array
}