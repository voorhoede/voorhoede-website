const appConfig = require('../../../src/client/static/data/app.json')

const GA_ID = appConfig.googleAnalyticsId
const AW_ID = 'AW-926139478'
const dimensions = {
  TRACKING_VERSION: 'dimension1'
}
const TRACKING_VERSION = appConfig.trackingVersion

export default (context, inject) => {
  inject('tracking', {
    enable() {
      if (!isInitialized() && !doNotTrack()) {
        initAanalytics()
      }
      if (isInitialized) {
        gtag('js', new Date())
        gtag('config', GA_ID)
        gtag('config', AW_ID)
        gtag('set', dimensions.TRACKING_VERSION, TRACKING_VERSION)
      }
    },
  })

  context.app.$tracking.enable()
}

function gtag() {
  if (isInitialized()) {
    window.dataLayer.push(arguments)
  }
}

function initAanalytics() {
  const script = document.createElement('script')
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(script)

  window.dataLayer = []

}

function isInitialized() {
  return Array
    .from(document.getElementsByTagName('script'))
    .some(script => script.src.includes('googletagmanager'))
}

function doNotTrack() {
  return (
    ( window.doNotTrack && window.doNotTrack === '1' ) ||
    ( navigator.doNotTrack && ( navigator.doNotTrack === 'yes' || navigator.doNotTrack === '1' )) ||
    ( navigator.msDoNotTrack && navigator.msDoNotTrack === '1' ) ||
    ( window.external && 'msTrackingProtectionEnabled' in window.external && window.external.msTrackingProtectionEnabled() )
  )
}
