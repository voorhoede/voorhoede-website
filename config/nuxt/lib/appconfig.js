const appData = require('../../../src/client/static/data/nl/layouts/default/index.json')

const appConfig = {
  googleAnalyticsTrackingId : appData.app.googleAnalyticsId,
  experimentId: appData.app.experimentsId
}

module.exports = appConfig

