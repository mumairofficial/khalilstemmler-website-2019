import React from 'react'
import Layout from '../components/shared/layout';
import { BlogsContainer } from '../components/shared/blogs';

const pageDescription = `Short form notes, thoughts, ideas 
& answers to frequently asked questions`;

export default () => (
  <Layout
    title="Blogs"  
    subTitle={pageDescription}
    seo={{
      title: 'Blogs',
      description: pageDescription
    }}
  >
    <BlogsContainer 
      titleText="All blogs"
    />
  </Layout>
)