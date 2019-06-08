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

function loadScript (src) {
  return new Promise(function(resolve, reject){
    var script = document.createElement('script');
    script.src = src;
    script.addEventListener('load', function () {
      resolve();
    });
    script.addEventListener('error', function (e) {
      reject(e);
    });
    document.body.appendChild(script);
  })
};
// Promise Interface can ensure load the script only once.
loadScript('https://platform.twitter.com/widgets.js');


exports.onPreRouteUpdate = ({ location, prevLocation }) => {
  if (typeof window !== 'undefined') {
    try {
      document.querySelector('.article-anchors').remove()
    } catch (err) {
      console.log(err);
    }
  }
}


// <script async src="" charset="utf-8"></script>