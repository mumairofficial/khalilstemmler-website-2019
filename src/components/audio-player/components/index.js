import React from 'react'
import { StaticQuery, graphql } from "gatsby"
import { withPrefix } from 'gatsby'
import { Subject } from 'rxjs'

class Track {
  constructor (uniqIndex, audioContext) {
    this.uniqIndex = uniqIndex;
    this.audioElement = document.querySelector(`audio[data-track-index="${uniqIndex}"]`);
    this.connectToAudioContext(audioContext);
    this.onEnded = new Subject();
    this.setupSubscriptions();
  }

  setupSubscriptions () {
    this.audioElement.onended = () => {
      this.onEnded.next(this.getIndex());
    }
  }

  connectToAudioContext (audioContext) {
    const inputNode = audioContext.createMediaElementSource(this.audioElement);
    inputNode.connect(audioContext.destination);
  }

  getIndex () {
    return this.uniqIndex;
  }

  play () {
    this.audioElement.play();
  }

  pause () {
    this.audioElement.pause();
  }

  stop () {
    this.audioElement.pause();
    this.audioElement.currentTime = 0;
  }
}

const PlayerStates = {
  PLAYING: 'playing',
  PAUSED: 'paused',
  IDLE: 'idle'
}

class AudioController {
  constructor (callbacks) {
    this.state = PlayerStates.IDLE;
    this.currentTrack = null;
    this.currentTrackEndedSubscription = null;
    this.callbacks = callbacks;
  }

  subscribeToTrackSubscriptions = () => {
    const { onTrackEnd } = this.callbacks;
    this.onTrackEndedSub = this.currentTrack.onEnded.subscribe(
      (index) => onTrackEnd(index)
    )
  }

  clearSubscriptions = () => {
    if (this.currentTrackEndedSubscription) {
      this.currentTrackEndedSubscription.unsubscribe();
    }
  }

  stopCurrentTrack = () => {
    if (this.currentTrack) this.currentTrack.stop();
    this.clearSubscriptions();
    this.state = PlayerStates.IDLE;
  }

  playTrack = (track) => {
    if (!(track instanceof Track)) throw new Error('AudioController expects Tracks.')
    this.stopCurrentTrack();
    this.currentTrack = track;
    this.currentTrack.play();
    this.state = PlayerStates.PLAYING;
    this.subscribeToTrackSubscriptions();
  }
}

class Map {
  constructor () {
    this.map = {}
  }

  has (key) {
    if (this.map[key]) return true;
    return false;
  }

  get (key) {
    return this.map[key];
  }

  set (key, value) {
    return this.map[key] = value;
  }
}

class MusicPlayer extends React.Component {
  constructor (props) {
    super(props);
    this.audioContext = null;
    this.audioController = new AudioController({
      onTrackEnd: this.onTrackEnd.bind(this)
    });
    this.createNewAudioContext();
    this.alreadyPlayedTracks = new Map();
    this.state = {
      currentTrackIndex: -1
    }
  }

  onTrackEnd = (currentIndex) => {
    this.onSelectTrack(currentIndex + 1);
  }

  createNewAudioContext = () => {
    // for legacy browsers
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.audioContext = new AudioContext();
  }

  clearAutoPlayPolicy = () => {
    // check if context is in suspended state (autoplay policy)
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }

  pause = () => {

  }
  
  trackExists = (index) => {
    return !!document.querySelector(`audio[data-track-index="${index}"]`);
  }

  onSelectTrack = (index) => {
    this.clearAutoPlayPolicy();
    this.createNewAudioContext();
    
    if (!this.trackExists(index)) {
      this.setState({...this.state, currentTrackIndex: -1 })
      return;
    }

    let track;
    if (this.alreadyPlayedTracks.has(index)) {
      track = this.alreadyPlayedTracks.get(index);
    } else {
      track = new Track(index, this.audioContext);
      this.alreadyPlayedTracks.set(index, track);
    }
    this.audioController.playTrack(track);
    this.setState({ ...this.state, currentTrackIndex: index })
  }

  render () {
    const { playlist } = this.props;
    const { currentTrackIndex } = this.state;
    return (
      <div>
        {playlist.map((p, i) => {
          const { name, relativePath } = p;
          return (
            <div 
              className={`
                music-player--track 
                ${currentTrackIndex === i ? 'playing' : ''}
              `}
              onClick={() => this.onSelectTrack(i)} 
              key={i}>
              <div>{name}</div>
              <audio 
                data-track-index={i} 
                src={withPrefix(`media/${relativePath}`)} 
                type="audio/mpeg">
              </audio>
            </div>
          )
        })}
      </div>
    )
  }
}

export default () => (
  <StaticQuery
    query={graphql`
      query {
        allFile(filter: { extension: { eq: "mp3" } }) {
          edges {
            node {
              id
              name
              size
              prettySize
              relativePath
            }
          }
        }
      }
    `}
    render={data => {
      const music = data.allFile.edges.map((e) => e.node);
      return (
        <MusicPlayer
          playlist={music}
        />
      )
    }}
  />
)


