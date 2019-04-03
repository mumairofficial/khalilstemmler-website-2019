import React from 'react'
import PropTypes from 'prop-types'
import Layout from "../components/shared/layout"
import { StaticQuery, graphql } from "gatsby"
import { getBooksFromQuery } from '../utils/book'
import { BooksContainer } from '../components/books'
import { replaceAll, titleCase } from '../utils/text'

class Blank extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      searchTerm: ''
    }

    this.getSearchQueryFromUrl = this.getSearchQueryFromUrl.bind(this);
    this.reportToAnalytics = this.reportToAnalytics.bind(this)
  }

  reportToAnalytics = (topic) => {
    if (typeof window !== "undefined") {
      try {
        window.amplitude.getInstance().logEvent('Missing Topic Viewed', {
          topic: topic
        });
      } catch (err) {
        console.error(err);
      }
    }
  }

  getSearchQueryFromUrl = () => {
    const { location } = this.props;
    const search = location.search;
    const raw = search.substring(search.indexOf('=') + 1);
    if (!!raw) {
      let stripped = replaceAll(replaceAll(raw, '-', ' '), '=', ' ');
      let formatted = stripped
        .split(' ')
        .map((s) => titleCase(s))
        .join(' ');
      this.reportToAnalytics(formatted);
      return formatted;
    } else {
      return ""
    }
  } 

  componentDidMount () {
    this.setState({
      searchTerm: this.getSearchQueryFromUrl()
    })
  }

  render () {
    const { searchTerm } = this.state;
    const termPresent = !!searchTerm;
    return (
      <Layout 
        seo={{
          keywords: []
        }}
        title={termPresent ? searchTerm : 'This page is intentionally left blank'}
        >
        { termPresent && <h1>{searchTerm}</h1> }
        <h3>👷🚧 Under construction 👷🚧</h3>
        <p>It's not here yet.</p>
        <img src={"https://media.giphy.com/media/13W7IyoNBBqPkY/giphy.gif"}/>
        <p>But now I know you're looking for it (through internet magic), so I'll get on it soon!</p>
      </Layout>
    )
  }
}

export default Blank;