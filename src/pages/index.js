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
    <Feedback/>
    <br/>
    <RecentArticles/>
    <hr/>
    <br/>
    <RecentWikiEdits/>
    <SubscribeForm/>
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

