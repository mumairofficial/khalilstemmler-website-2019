import React from "react"
import Layout from "../components/shared/layout"
import { HomeComponentLeft, Hero, RecentArticles, RecentWikiEdits } from '../components/home'
import { SubscribeForm } from '../components/subscribe'
import { SolidBookResourceCard } from '../components/resources'

const IndexPage = () => (
  <Layout 
    seo={{
      title: 'Essential software development patterns, principles and tutorials with modern JavaScript and TypeScript',
      keywords: ['software development', 'typescript', 'react']
    }}
    component={<HomeComponentLeft/>}>
    <div className="home">
      <Hero/>
      <br/>
      <SubscribeForm/>
      <br/>
      <RecentArticles/>
      <SolidBookResourceCard/>
      <br/>
      <hr/>
      <br/>
      <RecentWikiEdits/>
      <a href="/resources/solid-nodejs-architecture">
        <img src="/img/resources/solid-book/insert-3.png"/>
      </a>
    </div>
  </Layout>
)

// PropTypes.shape({
//   isBlogPost: PropTypes.bool.isRequired,
//   post: PropTypes.shape({
//     title: PropTypes.string.isRequired,
//     description: PropTypes.string,
//     excerpt: PropTypes.string,
//     slug: PropTypes.string
//   }).isRequired,
//   image: PropTypes.string,
// }).isRequired

export default IndexPage;

