const appConfig = require('../../../src/client/static/data/app.json')

/*
const isProduction = (process.env.NODE_ENV === 'production')

export default ({ app }) => {
  app.router.afterEach(() => {
    console.log('test')
  })
}

<!-- Global site tag (gtag.js) - Google Ads: 926139478 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-926139478"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'AW-926139478');
</script>
*/

const GA_ID = appConfig.googleAnalyticsId
const TRACKING_VERSION = appConfig.trackingVersion

export default (context, inject) => {
  inject('tracking', {
    enable() {
      if (!isInitialized() && !doNotTrack()) {
        initANALYTICS()

        this.add({
          event: 'gtm.js',
          'gtm.start': new Date().getTime(),
        })
      }
    },
    add(event) {
      if (isInitialized()) {
        window.dataLayer.push(event)
      }
    },
  })

  context.app.$tracking.enable()

  context.app.router.afterEach(() => {
    /*
     ** We tell Google Analytics to add a `pageview`
     */
    console.log('route analytics')
  })
}

function initANALYTICS() {
  const script = document.createElement('script')
  script.src = `https://www.googletagmanager.com/gtag/js?id=${ GA_ID }`

  window.dataLayer = []

  // overwrtie push method to datalayer array to we can control memory leaking
  window.dataLayer.push = function(event) {
    if(event['gtm.element']) {
      // clone the node and save that to the event instead of keeping reference to the original node, which causes memory leaks
      event['gtm.element'] = event['gtm.element'].cloneNode(true)
    }
    return Array.prototype.push.apply(this, arguments)
  }

  document.body.appendChild(script)
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
