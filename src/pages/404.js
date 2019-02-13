import React from "react"

import Layout from "./layout"
import SEO from "../components/shared/seo"

const randomFacts = [
  `In the early 1980s, Post-punk band "The Birthday Party" gained a reputation for their crazy shows. 
  By continuously getting dubbed by club promoters as one of the most "violent and manic" music events to observe,
  this had the effect of attracting some of Germany's lowest of the low to stop by shows and harass members,
  throw beers, fight and even go so far as rush the stage and urinate on equipment.
  Towards the end of their time together as a band, they played the remainder of their
  shows with their backs to the audience.`,
]

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <h1 style={{
      fontSize: '15vw'
    }}>404</h1>
    <div>{randomFacts[0]}</div>
  </Layout>
)

export default NotFoundPage
