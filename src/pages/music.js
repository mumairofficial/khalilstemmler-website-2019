import React from "react"

import Layout from "./layout"
import SEO from "../components/shared/seo"
import Line from '../components/shared/line'
import MusicPlayer from '../components/audio-player/components'
import { Link } from "gatsby"

const Music = () => (
  <Layout title="music">
    <SEO title="Music" />
    <p className="intro-text">
      {`the other thing I’m really passionate about is music. on occassion, 
      I’ll create sounds that I think are interesting, 
      and on blue moons- I’ll perform them.`}
      </p>
      <Line/>
      <br></br>
      <p>
      {`when i was 11, I spent a lot of time on the windows computer
        program, Audacity. I loved that program like a brother- I meticulously 
        recorded entire songs while listening to garbage
        like Mindless Self Indulgence and Box Car Racer. it wasn’t until I was 13 
        that I got myself a cracked copy of FL Studio. It pretty
        much all changed at that point and has been my primary DAW 
        for nearly a decade.`}
      </p>
      <p>
      {`I ended up releasing most of my solo work under Cyanide Canaries, 
        playing in a few short-lived bands in Ottawa, and
        then creating Debutante towards the leg of my university time.`}
      </p>
      <p>
      {`Lots of styles and genres interest me, so I just make whatever 
        I’m into at that particular time in my life.`}
      </p>
      <p>
      {`if you’re interested in how I make my music, I talk about that a
      little bit here.`}
      </p>
      
      <Link to="/">Home</Link>
  </Layout>
)

export default Music
