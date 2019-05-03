import React from "react"
import Layout from "../components/shared/layout"
import { HomeComponentLeft, Hero, RecentArticles, RecentWikiEdits } from '../components/home'
import { SubscribeForm } from '../components/subscribe'
import { Feedback } from '../components/feedback'

const IndexPage = () => (
  <Layout 
    seo={{
      title: 'Home',
      keywords: []
    }}
    component={<HomeComponentLeft/>}>
    <Hero/>
    <br/>
    <SubscribeForm/>
    <br/>
    <RecentArticles/>
    <hr/>
    <br/>
    <RecentWikiEdits/>
    <a href="/resources/solid-nodejs-architecture">
      <img src="/img/resources/solid-book/insert-3.png"/>
    </a>
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

