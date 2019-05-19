import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from "gatsby"
import Layout from "../components/shared/layout"
import { SmallSubscribeForm } from '../components/subscribe'

const otherSites = [
  { name: 'fran.world', image: 'https://khalilstemmler-2018.netlify.com/img/frans.png' },
  { name: 'talkify', image: 'https://talkify.com/wp-content/uploads/2019/02/Talkify_Logo.svg' },
  // { name: 'marine magnetics', image: }
]

export default class Porfolio extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <Layout 
        title="Portfolio"
        seo={{
          title: 'Portfolio',
          keywords: []
        }}
        component={(
          <div className="desktop-subscribe-form-container">
            <SmallSubscribeForm/>
          </div>
        )}>
        <h3>👷🚧 Under construction 👷🚧</h3>
        <p>The new portfolio isn't here yet. The last time I updated my portfolio 
          was May 2018. Quite a few new things since then during my time at Aquent | Dev6, 
          I'm just not sure how much 
          of it I have clearance to post... 🤔
        </p>
        <p>You can view my <a href="https://khalilstemmler-2018.netlify.com/work">old 2018 portfolio</a> here though.</p>
        {/* <p>Over the years, I’ve had the pleasure to work with dozens of really great people 
          and companies on some really amazing projects. Below are a few clients who I lay 
          claim to working with. Because of the type of clients I primarily work with, I’m not 
          able to display some of my best work on this site. If you would like to see some 
          examples or perhaps something a little more specific, please get in touch and I’d 
          be happy to send along a few examples!
        </p>
        
        {otherSites.map(({ name, image}) => (
          <div>
            <p>{name}</p>
            <div><img src={image}/></div>
          </div>
        ))} */}
        {/* <p>You can view my <a href="https://khalilstemmler-2018.netlify.com/work">old 2018 portfolio</a> here though.</p> */}
      </Layout>
    )
  }
};

export const pageQuery = graphql`
  query Portfolio {
    portfolioItems: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: {
        frontmatter: {
          templateKey: { eq: "portfolio-page" }
        }
      }
      limit: 1000
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            image 
            description
            date
          }
        }
      }
    }
  }
`


