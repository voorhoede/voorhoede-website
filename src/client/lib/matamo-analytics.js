export default function matamoPlugin(userConfig) {
  const _paq = window._paq = window._paq || []

  function loadScript() {
    const script = document.createElement('script')
    script.async = true
    script.src = `//cdn.matomo.cloud/${userConfig.domain}/matomo.js`
    document.head.appendChild(script)
  }

  // return object for analytics to use
  return {
    /* All plugins require a name */
    name: 'matamo',
    /* Everything else below this is optional depending on your plugin requirements */
    config: {
      whatEver: userConfig.whatEver,
      elseYouNeed: userConfig.elseYouNeed
    },
    initialize: ({ config }) => {
      // load provider script to page
      //_paq.push(['trackPageView'])
      //_paq.push(['enableLinkTracking'])
      _paq.push(['setTrackerUrl', '//' + userConfig.domain+'/matomo.php'])
      _paq.push(['setSiteId', '1'])

      loadScript()
    },
    page: ({ payload }) => {
      // call provider specific page tracking
      _paq.push(['trackPageView'])
    },
    track: ({ payload }) => {
      console.log(['trackEvent', payload.properties.category || 'All', payload.event])
      // call provider specific event tracking
      _paq.push(['trackEvent', payload.properties.category || 'All', payload.event])
    },
    identify: ({ payload }) => {
      // call provider specific user identify method
    },
    loaded: () => {
      // return boolean so analytics knows when it can send data to third party
      return true
    }
  }
}
