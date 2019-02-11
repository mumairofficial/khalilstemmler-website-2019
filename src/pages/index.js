import React from "react"
import { Link } from "gatsby"

import Layout from "./layout"
import Image from "../components/img-components/image"
import SEO from "../components/shared/seo"

const IntroCard = () => (
  <div className="intro-card">
    <h1>khalil_stemmler</h1>
    <h2>@stemmlerjs</h2>
  </div>
)

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <IntroCard/>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image/>
    </div>
    <Link to="/music/">Go to page 2</Link>
  </Layout>
)

export default IndexPage
