import React from 'react'
import AdSense from 'react-adsense';

const HorizonalAd = () => (
  <div style={{ width: '100%' }}>
    <AdSense.Google
      client='ca-pub-5892691365556220'
      slot='5129508414'
      style={{ display: 'block' }}
      format='auto'
      responsive='true'
    />
  </div>
)

export default HorizonalAd;