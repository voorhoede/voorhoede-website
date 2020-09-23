// const appConfig = require('../../../src/client/static/data/app.json')

const GTM_ID = 'GTM-WVVV3KG'

export default (context, inject) => {
  inject('tracking', {
    enable() {
      if (!isInitialized() && !doNotTrack()) {
        initAnalytics()
      }
    },
  })

  context.app.$tracking.enable()
}

function initAnalytics() {
  const script = document.createElement('script')
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`
  document.head.appendChild(script)

  window.dataLayer = []

  // overwrite push method to datalayer array to we can control memory leaking
  window.dataLayer.push = function(event) {
    if (event['gtm.element']) {
      // clone the node and save that to the event instead of keeping reference to the original node, which causes memory leaks
      event['gtm.element'] = event['gtm.element'].cloneNode(true)
    }
    return Array.prototype.push.apply(this, arguments)
  }
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
