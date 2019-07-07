
import React from 'react'
import "../styles/CarbonAd.sass"

export function initCarbonAd () {
  try {
    if (
      typeof window !== 'undefined' &&
      typeof window._bsa !== 'undefined' 
      && window._bsa) {
        window._bsa.init('default', 'CK7D42QU', 'placement:khalilstemmlercom', 
          { target: "#default_khalilstemmlercom", align: "horizontal" }
        );
    }
  } catch (err) {
    console.log(err);
  }
}

class CarbonAd extends React.Component {
  constructor (props) {
    super(props);
    this.initCarbonAd = this.initCarbonAd.bind(this);
  }

  componentDidMount () {
    this.initCarbonAd();
  }

  

  render () {
    return (
      <div className="carbon-ad">
        <div className="carbon-real-container" id="default_khalilstemmlercom"></div>
      </div>
    )
  }
}

export default CarbonAd;


