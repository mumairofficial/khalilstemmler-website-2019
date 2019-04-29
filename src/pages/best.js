import React from 'react'
import Layout from "../components/shared/layout"
import { Link } from 'gatsby'

const hasText = (text, textToFind) => {
  return text.indexOf(textToFind) !== -1;
}

class BestContent extends React.Component {
  constructor (props) {
    super(props);

    this.getTitleAndSubtext = this.getTitleAndSubtext.bind(this);
  }

  getTitleAndSubtext = () => {
    const { search } = this.props.location;
    let fromSOLID = hasText(search, 'solid-book-subscription');
    let title = "";
    let subtext = "";

    if (fromSOLID) {
      title = "Thanks for showing your interest!"
      subtext = "You'll get a download link when the book is ready."
    }

    return { title, subtext }
  }

  componentWillMount () {

  }

  render () {
    const { title, subtext } = this.getTitleAndSubtext();

    return (
      <Layout 
        title="Best content"
        seo={{ title: "Best content", keywords: [] }}
        rawMode={false}
        component={<div></div>}>

          <h1>{title}</h1>
          <h2>{subtext}</h2>

          <hr/>

          <p>Here's some of the best content from the blog over the past little while.</p>

          <p>
            <Link to="/articles/when-to-use-typescript-guide/">When To Use TypeScript - A Detailed Guide Through Common Scenarios</Link> - 🔥🔥15K reads
          </p>

          <p>
            <Link to="/articles/domain-driven-design-intro/">An Introduction to Domain-Driven Design - DDD w/ TypeScript</Link> - 🔥4K reads
          </p>

          <p>
            <Link to="/wiki/abstract-factory/">Abstract Factory: Explained with Pokemon</Link>
          </p>
      </Layout>
    );
  }
}

export default BestContent;