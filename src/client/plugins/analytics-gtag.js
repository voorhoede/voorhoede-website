import datoConstants from '@/static/data/app.json'

const GA_ID = datoConstants.googleAnalyticsId
const AW_ID = 'AW-926139478'

const TRACKING_VERSION = datoConstants.trackingVersion
const ENVIRONMENT_NAME = process.env.NODE_ENV
const TRACKING_TRANSPORT = 'gtag.js'

const dimensions = {
  TRACKING_VERSION: 'dimension1',
  ENVIRONMENT_NAME: 'dimension2',
  TRACKING_TRANSPORT: 'dimension3'
}

export default ({ app }, inject) => {
  loadScript()

  if(doNotTrack()) {
    inject('gtag', () => {})
    return
  }

  window.dataLayer = window.dataLayer || []

  inject('gtag', gtag)
  gtag('js', new Date())
  gtag('config', GA_ID, {
    'send_page_view': false,
    'transport_type': 'beacon',
    'anonimize_ip': true
  })
  gtag('set', dimensions.TRACKING_VERSION, TRACKING_VERSION)
  gtag('set', dimensions.ENVIRONMENT_NAME, ENVIRONMENT_NAME)
  gtag('set', dimensions.TRACKING_TRANSPORT, TRACKING_TRANSPORT)

  gtag('config', AW_ID)

  app.router.afterEach((to) => {
    /*
     ** We tell Google Analytics to add a `pageview`
     */
    gtag('event', 'page_view', {
      'page_title': document.title,
      'page_path': to.fullPath,
      'location_path': window.location.origin + to.fullPath,
      'send_to': datoConstants.googleAnalyticsId
    })
  })

  function loadScript() {
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
    document.head.appendChild(script)
  }

  function gtag () {
    window.dataLayer.push(arguments)

    if (ENVIRONMENT_NAME == 'development') {
      // eslint-disable-next-line no-console
      console.debug('gtag tracking called with following arguments:', arguments)
    }
  }

  function doNotTrack() {
    return (
      ( window.doNotTrack && window.doNotTrack === '1' ) ||
      ( navigator.doNotTrack && ( navigator.doNotTrack === 'yes' || navigator.doNotTrack === '1' )) ||
      ( navigator.msDoNotTrack && navigator.msDoNotTrack === '1' ) ||
      ( window.external && 'msTrackingProtectionEnabled' in window.external && window.external.msTrackingProtectionEnabled() )
    )
  }
}
