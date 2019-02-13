import React from "react"
import { StaticQuery, graphql } from "gatsby"

import Layout from "./layout"
import SEO from "../components/shared/seo"
import Line from '../components/shared/line'
import MusicPlayer from '../components/audio-player/components'
import { Link } from "gatsby"
import * as moment from "moment";
import Vimeo from 'react-vimeo'


const Section = ({ title }) => (
  <div className="music-section">
    {title}
  </div>
)

const RecentMusicTab = () => (
  <>
    <Section title={"Series of unreleased works from 2017-2019"}/>
    <MusicPlayer/>
  </>
)

const Discography = ({ albums }) => (
  <>
    {albums.map((album, i) => (
      <div className="album" key={i}>
        <Section title={album.albumInfo.title}/>
        <div className="album--content">
          <div className="album--image-container">
            <img src={album.albumInfo.imageUrl}/>
          </div>
          <div className="album--details">
            <div>by {album.albumInfo.artist}</div>
            <div>{moment(album.albumInfo.raw.album_release_date).format('MMMM Do YYYY')}</div>
            <a href={album.url}>More info</a>
            <a href={album.url}>Download</a>
          </div>
        </div>
      </div>
    ))}
  </>
)

const Video = ({ videos }) => (
  <>
    {videos.map((video, i) => (
      <div className="video" key={i}>
        <Section title={video.title}/>
        <div>{video.description}</div>
        <a style={{ marginTop: '5px'}} href={video.link}>More info</a>
        <br></br><br></br>
        <Vimeo videoId={ video.id } />
      </div>
    ))}
  </>
)

const TabsControl = ({ options, tab, onSelectTab }) => (
  <div className="music-library-tabs">
    {options.map((option, i) => (
      <div 
        onClick={() => onSelectTab(option.tab)}
        className={`
          music-library-tabs--tab
          ${tab === option.tab ? 'selected' : ''}
        `} 
        key={i}>
        {option.display}
      </div>
    ))}
  </div>
)

const Tab = ({ children, selected }) => (
  <div
    style={{
      display: selected ? 'initial' : 'none',
      overflow: 'hidden'
    }}
  >
    {children}
  </div>
)

class LibraryAndDiscography extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      currentTab: 'RECENT'
    };
  }
  isTabActive = (tab) => {
    const { currentTab } = this.state;
    return tab === currentTab;
  }

  onSelectTab = (tab) => {
    this.setState({ ...this.state, currentTab: tab })
  }

  render () {
    const { currentTab } = this.state;
    const { albums, videos } = this.props;
    return (
      <div>
        <Line/>
        <br></br>
        <TabsControl
          options={[
            { tab: 'RECENT', display: "Recent" },
            { tab: 'DISCOGRAPHY', display: "Discography" },
            { tab: 'VIDEO', display: 'Video' }
          ]}
          tab={currentTab} 
          onSelectTab={this.onSelectTab}
        />

        <Tab selected={this.isTabActive('RECENT')}>
          <RecentMusicTab/>
        </Tab>

        <Tab selected={this.isTabActive('DISCOGRAPHY')}>
          <Discography albums={albums}/>
        </Tab>
        
        <Tab selected={this.isTabActive('VIDEO')}>
          <Video videos={videos}/>
        </Tab>

      </div>
    )
  }
}

const MusicLibraryAndDiscographyQuery = ({ RenderComponent }) => (
  <StaticQuery
    query={graphql`
      query {
        allAlbumsJson {
          edges {
            node {
              url
              albumInfo {
                artist
                title
                imageUrl
                tracks {
                  name
                  duration
                  url
                }
                raw {
                  album_release_date
                }
              }
            }
          }
        }
        allVideosJson {
          edges {
            node {
              type,
              title,
              id,
              description,
              link
            }
          }
        }
      }
    `}
    render={data => {
      const albums = data.allAlbumsJson.edges.map((e) => e.node);
      const videos = data.allVideosJson.edges.map((e) => e.node);
      return (
        <RenderComponent albums={albums} videos={videos}/>
      )
    }}
  />
)

export default class Music extends React.Component {
  constructor (props) {
    super(props);
    this.state = {

    }
  }

  render () {
    return (
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

          <MusicLibraryAndDiscographyQuery
            RenderComponent={LibraryAndDiscography}
          />
      </Layout>
    )
  }
}

