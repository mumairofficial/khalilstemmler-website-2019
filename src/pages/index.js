import React from "react"
import { Link } from "gatsby"

import Layout from "./layout"
import Image from "../components/img-components/image"
import SEO from "../components/shared/seo"
import Line from '../components/shared/line'

const IntroCard = () => (
  <div className="intro-card">
    <h1>khalil_stemmler</h1>
    <h2>@stemmlerjs</h2>
  </div>
)

const HomeComponent = () => (
  <div>
    <IntroCard/>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image/>
    </div>
    <Link to="/music/">Go to page 2</Link>
  </div>
)

const IndexPage = () => (
  <Layout component={<HomeComponent/>}>
    <SEO 
      title="Home" 
      keywords={[`gatsby`, `application`, `react`]} 
    />
    <p className="intro-text">
      {`software developer / designer, musician based 
        out of southern ontario cities currently working 
        in the wonderful world of software consulting`}
      </p>
      <Line/>
      <br></br>
      <p>
      {`I’m currently working at Aquent Dev6 as a consultant. Day to 
        day involves collaborating with remote development teams on 
        front-end architectures, speaking and keeping up w/ current 
        technologies in our industry, creating course content, advising 
        best practices, and learning from other talented consultants.`}
      </p>
      <p>
      {`What am I good at? JavaScript, for one. I’m truly a full-stack 
        developer. Design, ui, ux, empathy, sql, and curious to learn more 
        about enterprise level application archecture. I believe that there’s 
        only enough time on earth to truly become an expert at one or 
        two things. Software development is one of my picks and I’m
        working towards it every day. Music is the other.`}
      </p>
  </Layout>
)

export default IndexPage
