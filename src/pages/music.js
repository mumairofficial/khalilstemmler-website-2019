import React from "react"
import { Link } from "gatsby"

import Layout from "./layout"
import SEO from "../components/shared/seo"

const Music = () => (
  <Layout>
    <SEO title="Music" />
    <h1>Hi from the second page</h1>
    <p>Welcome to page 2</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default Music
