
import React from 'react'
import "../styles/CarbonAd.css"

export function initCarbonAd () {
  try {
    if (
      typeof window !== 'undefined' &&
      typeof window._bsa !== 'undefined' 
      && window._bsa) {
        window._bsa.init('default', 'CK7D42QU', 'placement:khalilstemmlercom', 
          { target: "#_carbonads_js", align: "horizontal" }
        );
    }
  } catch (err) {
    console.log(err);
  }
}

class CarbonAd extends React.Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    if (typeof window !== "undefined") {
      try {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.setAttribute("id", "_carbonads_js");
        script.onload = function(){
            // remote script has loaded
        };
        script.src = 'https://cdn.carbonads.com/carbon.js?serve=CE7D4K3E&placement=khalilstemmlercom';
        document.getElementById('carbon-mount').appendChild(script);
      } catch (err) {
        console.log(err);
      }
    }
  }
  
  render () {
    return (
      <>
        <div id="carbon-mount"></div>
      </>
    )
  }
}

export default CarbonAd;


