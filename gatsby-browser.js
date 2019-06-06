require("./src/assets/styles/global.sass");
require('rodal/lib/rodal.css')

const ReactGA = require('react-ga')

require('./static/scripts/amplitude')
const domain = 'khalilstemmler.com'
let id = 'NOPE'

const isProd = document.location.hostname.indexOf(domain) !== -1;

if (isProd) {
  id = 'UA-75700925-1'
  console.log('[Site]: Google Analytics started in prod.')
  require('./static/scripts/hotjar')
} else {
  console.log('[Site]: Google Analytics not started.')
}

ReactGA.initialize(id)

exports.onRouteUpdate = ({ location, prevLocation }) => {
  console.log('new pathname', location.pathname)
  console.log('old pathname', prevLocation ? prevLocation.pathname : null)

  ReactGA.pageview(location.pathname + location.search + location.hash)
}
