import React from "react"
import Layout from "../components/shared/layout"
import SEO from "../components/shared/seo"
import { HomeComponentLeft, Hero, RecentArticles } from '../components/home'

const IndexPage = () => (
  <Layout component={<HomeComponentLeft/>}>
    <SEO 
      title="Home" 
      keywords={[`gatsby`, `application`, `react`]} 
    />
    <Hero/>
    <br/>
    <RecentArticles/>
  </Layout>
)

export default IndexPage;

