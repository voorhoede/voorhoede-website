const { promisify } = require('util')
const fs = require('fs')
const path = require('path')

const manifest = require('../../dist/client/_nuxt/manifest.json')

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

const serviceWorkerPath = path.join(__dirname, '../../dist/client/sw.js')

async function revisionServiceWorker() {
  const originalServiceWorker = await readFile(serviceWorkerPath, 'utf8')

  const revisionedServiceWorker = Object.keys(manifest).reduce((serviceWorker, unhashedChunkName) => {
    const hashedChunkName = manifest[unhashedChunkName]

    return serviceWorker.replace(unhashedChunkName, hashedChunkName)
  }, originalServiceWorker)

  await writeFile(serviceWorkerPath, revisionedServiceWorker, 'utf8')

  console.info('Service worker core assets have been revisioned')
}

revisionServiceWorker()
