const ReactGA = require('react-ga')

const domain = 'khalilstemmler.com'
let id = 'NOPE'

if (document.location.hostname.indexOf(domain) !== -1) {
  id = 'UA-75700925-1'
  console.log('[Site]: Analytics started in prod.')
} else {
  console.log('[Site]: Analytics not started.')
}

ReactGA.initialize(id)

exports.onRouteUpdate = ({ location, prevLocation }) => {
  console.log('new pathname', location.pathname)
  console.log('old pathname', prevLocation ? prevLocation.pathname : null)

  ReactGA.pageview(location.pathname + location.search + location.hash)
}