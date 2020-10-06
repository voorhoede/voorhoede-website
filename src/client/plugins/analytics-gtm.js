import datoConstants from '@/static/data/app.json'

const ENVIRONMENT_NAME = process.env.NODE_ENV
const GTM_ID = datoConstants.googleTagManagerId
const UA_VERSION = datoConstants.trackingVersion
const TRACKING_TRANSPORT = 'gtm.js'

export default () => {
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
  // 3. add gtm script to page
  const script = document.createElement('script')
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`
  document.head.appendChild(script)
}
