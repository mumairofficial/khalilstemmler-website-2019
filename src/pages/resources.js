import React from 'react'
import PropTypes from 'prop-types'
import Layout from "../components/shared/layout"
import solidBook from '../images/resources/solid/solid-cover.png'
import { ResourceItem } from '../components/resources';

const resourceItems = [
  { 
    name: 'SOLID', 
    description: `An introduction 
      to software 
      architecture
      & design principles 
      with Node.js & 
      TypeScript.`,
    url: '/resources/solid-nodejs-architecture',
    img: solidBook,
    contentType: 'Free Ebook'
  }
]

export class Resources extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <Layout 
        title="Resources"
        seo={{
          title: 'Resources',
          keywords: ['nodejs', 'javascript', 'typescript', 'resources']
        }}
        component={(
          <>
            <p>Catalog of useful guides, books and links for developers.</p>
          </>
        )}>
        
        { resourceItems.map((resource, i) => (
          <ResourceItem 
            key={i}
            name={resource.name}
            description={resource.description}
            url={resource.url}
            image={resource.img}
            contentType={resource.contentType}
          />
        ))}

      </Layout>
    )
  }
}

export default Resources;