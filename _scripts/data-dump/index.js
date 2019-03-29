const fs = require('fs')
const util = require('util')
const chalk = require('chalk')
const glob = util.promisify(require('glob'))
const path = require('path')
const mkdirp = require('mkdirp')
const dotenv = require('dotenv-safe')
const dayjs = require('dayjs')

const prismifyCodeBlocks = require('../../src/client/lib/prismify-code-blocks')
const addClassesToHeadings = require('../../src/client/lib/add-classes-to-headings')

const appSettings = require('../../src/client/static/data/app.json')
dotenv.config()

/*
 * For each overview page query dato and write json file
 * If we find items on the overview page query them as well and write json file
 * Do it for both locales
 *
*/

const queryApi = require('../../src/client/lib/query-api')
const locales = appSettings.locales.map(({ code }) => code)

glob(path.join(__dirname, '../../src/client/**/*.query.graphql'))
  .then(paths => paths.filter(path => !path.includes('slug')))
  .then(paths => {
    paths.forEach(queryPath => {
      locales.forEach(locale => {
        getPageData(queryPath, locale)
      })
    })
  })

function getPageData(queryPath, locale) {
  const currentDate = dayjs().format('YYYY-MM-DD')
  return runQuery(queryPath, { locale, currentDate })
    .then(pageData => {
      const isHomePage = locales.includes(pageData.page.slug)
      const relPath = isHomePage ? locale : path.join(locale, pageData.page.slug)
      writeJsonFile({ filePath: relPath, data: pageData })
      console.log(chalk.green(`👌️ Successfully written: ${relPath}`)) // eslint-disable-line no-console
      if (pageData.items) {
        pageData.items
          .map(item => item && item.slug)
          .forEach(slug => {
            if (slug === undefined || slug === null) {
              return
            }

            const slugQueryPath = path.join(path.parse(queryPath).dir, '_slug.query.graphql')

            runQuery(slugQueryPath, { locale, slug })
              .then(data => {
                const relPath = path.join(locale, pageData.page.slug, data.page.slug)
                // Add typography classes to headings,
                // run code block content through prismjs
                if (data.page && Array.isArray(data.page.items)) {
                  addClassesToHeadings(data.page.items)
                  prismifyCodeBlocks(data.page.items)
                }
                writeJsonFile({ filePath: relPath, data })
                console.log(chalk.green(`👌️ Successfully written: ${relPath}`)) // eslint-disable-line no-console
              })
              .catch(e => {
                console.error(chalk.red('Error for ' + slugQueryPath, e)) // eslint-disable-line no-console
                process.exit(1)
              })
          })
      }
    })
    .catch(e => {
      console.error(chalk.red('Error for ' + queryPath, e)) // eslint-disable-line no-console
      process.exit(1)
    })
}

function runQuery(queryFilePath, variables) {
  return readQueryFile(queryFilePath)
    .then(query => queryApi({ query, variables }))
}

function readQueryFile(query) {
  return new Promise((resolve, reject) => {
    fs.readFile(query, 'utf8', (err, query) => {
      err ? reject(err) : resolve(query)
    })
  })
}

async function writeJsonFile({ filePath, data }) {
  const outputFileDir = path.join(__dirname, '../../src/client/static/data/', filePath)
  const outputFilePath = path.join(outputFileDir, 'index.json')
  if (!fs.existsSync(outputFileDir)) {
    await createDirectory(outputFileDir)
  }

  return new Promise((resolve, reject) => {
    return fs.writeFile(outputFilePath, JSON.stringify(data), 'utf8', (err) => {
      err ? reject(err) : resolve()
    })
  })
}

function createDirectory(dir) {
  return new Promise((resolve, reject) => mkdirp(dir, (err) => err ? reject(err) : resolve()))
}
