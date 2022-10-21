import Analytics from 'analytics'
import plausiblePlugin from 'analytics-plugin-plausible'

export default ({ app }, inject) => {
  const analytics = new Analytics({
    app: 'voorhoede-website',
    plugins: [
      plausiblePlugin({
        domain: 'voorhoede.nl',
        trackLocalhost: true,
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
