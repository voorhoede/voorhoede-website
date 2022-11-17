import Analytics from 'analytics'
import plausiblePlugin from 'analytics-plugin-plausible'
import simpleAnalyticsPlugin from '@analytics/simple-analytics'
import matamoPlugin from '../lib/matamo-analytics'

export default ({ app }, inject) => {
  const analytics = new Analytics({
    app: 'voorhoede-website',
    plugins: [
      plausiblePlugin({
        domain: location.host,
        trackLocalhost: true,
      }),
      simpleAnalyticsPlugin(),
      matamoPlugin({
        domain: 'fairtradefrontend.matomo.cloud'
      })
    ]
  })

  app.router.afterEach((to) => {
    analytics.page()
  })

  inject('gtag', function(_type, name, data) {
    analytics.track(name, data)
  })
}
