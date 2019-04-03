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

(function(e,t){var n=e.amplitude||{_q:[],_iq:{}};var r=t.createElement("script")
;r.type="text/javascript"
;r.integrity="sha384-d/yhnowERvm+7eCU79T/bYjOiMmq4F11ElWYLmt0ktvYEVgqLDazh4+gW9CKMpYW"
;r.crossOrigin="anonymous";r.async=true
;r.src="https://cdn.amplitude.com/libs/amplitude-5.2.2-min.gz.js"
;r.onload=function(){if(!e.amplitude.runQueuedFunctions){
console.log("[Amplitude] Error: could not load SDK")}}
;var i=t.getElementsByTagName("script")[0];i.parentNode.insertBefore(r,i)
;function s(e,t){e.prototype[t]=function(){
this._q.push([t].concat(Array.prototype.slice.call(arguments,0)));return this}}
var o=function(){this._q=[];return this}
;var a=["add","append","clearAll","prepend","set","setOnce","unset"]
;for(var u=0;u<a.length;u++){s(o,a[u])}n.Identify=o;var c=function(){this._q=[]
;return this}
;var l=["setProductId","setQuantity","setPrice","setRevenueType","setEventProperties"]
;for(var p=0;p<l.length;p++){s(c,l[p])}n.Revenue=c
;var d=["init","logEvent","logRevenue","setUserId","setUserProperties","setOptOut","setVersionName","setDomain","setDeviceId","setGlobalUserProperties","identify","clearUserProperties","setGroup","logRevenueV2","regenerateDeviceId","groupIdentify","onInit","logEventWithTimestamp","logEventWithGroups","setSessionId","resetSessionId"]
;function v(e){function t(t){e[t]=function(){
e._q.push([t].concat(Array.prototype.slice.call(arguments,0)))}}
for(var n=0;n<d.length;n++){t(d[n])}}v(n);n.getInstance=function(e){
e=(!e||e.length===0?"$default_instance":e).toLowerCase()
;if(!n._iq.hasOwnProperty(e)){n._iq[e]={_q:[]};v(n._iq[e])}return n._iq[e]}
;e.amplitude=n})(window,document);

let amplitudeLoaded = false;

function getInstance() {
  return new Promise((resolve, reject) => {
    wait(() => {
      resolve(window.amplitude.getInstance())
    })
  })
}

function wait (promiseToResolve) {
  if (amplitudeLoaded === true) {
    promiseToResolve()
  }
  else {
    setTimeout(wait.bind(null, promiseToResolve), 250);
  }
}

async function initAmplitude () {
  const amp = await getInstance();
  amp.init("c2f3c018a9bd18aa89c239c30a86a418");
}

initAmplitude();