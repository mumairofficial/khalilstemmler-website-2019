
import axios from 'axios'

async function getRecentlyPlayedTracks () {
  const response = await axios({
    method: 'GET',
    url: 'https://api.spotify.com/v1/me/player/recently-played',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer BQCSGhvuPx_zm0Yeq-ryE6ViUF3QAV7gRK_BhVmta6Jve29WoXiV6t0F34DVYq8jAFVidji8mF8mFfDvtvS9Zuutw4VprFOFZUnc14c68_m9CPTfatrditk3MMgDsWfwsn3WW5z_GJaFByiM0sPTel0HQDVSbg'
    }
  })


}