import datoConstants from '@/static/data/app.json'

const ENVIRONMENT_NAME = process.env.NODE_ENV
const GTM_ID = 'GTM-WVVV3KG'
const UA_VERSION = datoConstants.trackingVersion
const TRACKING_TRANSPORT = 'gtm.js'

export default (context, inject) => {
  inject('tracking', {
    enable() {
      if (!isInitialized() && !doNotTrack()) {
        initTagManager()
      }
    },
  })

  context.app.$tracking.enable()
}

function initTagManager() {
  /*
  (function(w, d, s, l, i) {
    w[l] = w[l] || [] // window.dataLayer = window.dataLayer OR empty ARRAY
    w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' }) // populate window.datalayer with start object
    var f = d.getElementsByTagName(s)[0], // get first script tag of the document
      j = d.createElement(s), // create a new document script tag
      dl = l != 'dataLayer' ? '&l=' + l : '' // new var for dataLayer and rename dataLayer if so set

      j.async = true // new document script tag should load async
      j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl // new document script tag with dataLayer name parameter if set

      f.parentNode.insertBefore(j, f) // insert new script tag before the first script tag of the document

  })(
    window,
    document,
    'script',
    'dataLayer',
    GTM_ID
  )

  window.dataLayer.push = function(event) {
    if (event['gtm.element']) {
      // clone the node and save that to the event instead of keeping reference to the original node, which causes memory leaks
      event['gtm.element'] = event['gtm.element'].cloneNode(true)
    }
    return Array.prototype.push.apply(this, arguments)
  }

  */

  // 1. create dataLayer
  window.dataLayer = window.dataLayer || []
  // 2. push object to start gtm and populate custom dimensions
  window.dataLayer.push({
    'gtm.start': new Date().getTime(),
    event: 'gtm.js',
    'trackingVersion': UA_VERSION,
    'trackingTransport': TRACKING_TRANSPORT,
    'environmentName': ENVIRONMENT_NAME,
  })
  // 3. overwrite push method to dataLayer array so we can control memory leaking

  /*
  window.dataLayer.push = function(event) {
    if (event['gtm.element']) {
      // clone the node and save that to the event instead of keeping reference to the original node, which causes memory leaks
      event['gtm.element'] = event['gtm.element'].cloneNode(true)
    }
    return Array.prototype.push.apply(this, arguments)
  }
  */

  const script = document.createElement('script')
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`
  document.head.appendChild(script)

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
