const fs = require('fs')
const path = require('path')
const identity = require('lodash/identity')

const isPublished = require('./lib/is-published')
const hasBody = require('./lib/has-body')
const getData = require('./lib/get-data')

const aboutUs = require('./about-us')
const academy = require('./academy')
const blogPosts = require('./blog-posts')
const blog = require('./blog')
const casesOverview = require('./cases-overview')
const cases = require('./cases')
const contact = require('./contact')
const home = require('./home')
const jobs = require('./jobs')
const services = require('./services')

const staticDir = 'src/client/static'
const dataDir = `${staticDir}/data/new`
const pagesDir = `${dataDir}/pages`

module.exports = (dato, root, i18n) => {
  const dataDump = getData(dato, root, i18n, i18n.availableLocales)
  const dataDumpEn = getData(dato, root, i18n, ['en'])
  const savePage = dataDump(pagesDir, false, identity)
  const savePageEn = dataDumpEn(pagesDir, false, identity)
  const saveCollection = dataDump(pagesDir, true)
  const saveCollectionEn = dataDumpEn(pagesDir, true)

  savePage(home, 'home', 'index.json')
  savePage(aboutUs, 'team', { en: 'about-us.json', nl: 'over-ons.json' })
  savePage(academy, 'eventOverview', 'academy.json')
  savePageEn(blog, 'blog', 'blog/index.json')
  savePage(contact, 'contact', 'contact.json')
  savePage(casesOverview, 'work', 'cases/index.json')

  saveCollectionEn(isPublished, blogPosts, 'blogPosts', 'blog')
  saveCollection(isPublished, cases, 'projects', 'cases')
  saveCollection(isPublished, jobs, 'jobs', { en: 'jobs', nl: 'vacatures' })
  saveCollection(hasBody, services, 'services', 'services')

  root.createDataFile(`${dataDir}/menu.json`, 'json', {
    en: [
      { title: 'Services', slug: 'services' },
      { title: 'Cases', slug: 'cases' },
      { title: 'Academy', slug: 'academy' },
      { title: 'About Us', slug: 'about-us' },
      { title: 'Contact', slug: 'contact', button: true },
    ],
    nl: [
      { title: 'Services', slug: 'services' },
      { title: 'Cases', slug: 'cases' },
      { title: 'Academy', slug: 'academy' },
      { title: 'Over Ons', slug: 'over-ons' },
      { title: 'Contact', slug: 'contact', button: true },
    ],
  })

  fs.writeFileSync(
    path.join(__dirname, '../../', `${staticDir}/_redirects`),
    `/\t/${process.env.DEFAULT_LOCALE}/`,
    'utf8'
  )
}
