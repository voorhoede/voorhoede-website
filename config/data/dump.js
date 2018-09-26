const fs = require('fs')
const util = require('util')
const chalk = require('chalk')
const glob = util.promisify(require('glob'))
const path = require('path')
const mkdirp = require('mkdirp')
const dotenv = require('dotenv-safe')
const Prism = require('prismjs')
const loadLanguages = require('prismjs/components/')

// Load additional prism languages
loadLanguages(['bash'])

dotenv.config()

/*
 * For each overview page query dato and write json file
 * If we find items on the overview page query them as well and write json file
 * Do it for both locales
 *
*/

const queryApi = require('../../src/client/lib/query-api')
const locales = ['nl', 'en']

glob(path.join(__dirname, '../../src/client/**/index.query.graphql'))
  .then(paths => {
    paths.forEach(queryPath => {
      locales.forEach(locale => {
        const alternateLocale = locales.find(l => l !== locale)
        getPageData(queryPath, locale, alternateLocale)
      })
    })
  })

function getPageData(queryPath, locale, alternateLocale) {
  return runQuery(queryPath, { locale, alternateLocale })
    .then(pageData => {
      const isHomePage = locales.includes(pageData.page.slug)
      const relPath = isHomePage ? locale : path.join(locale, pageData.page.slug)
      writeJsonFile({ filePath: relPath, data: pageData })
      console.log(chalk.green(`👌️ Successfully written: ${relPath}`)) // eslint-disable-line no-console
      if (pageData.items) {
        pageData.items
          .map(item => item.slug)
          .forEach(slug => {
            const slugQueryPath = path.join(path.parse(queryPath).dir, '_slug.query.graphql')
            runQuery(slugQueryPath, { locale, alternateLocale, slug })
              .then(data => {
                const relPath = path.join(locale, pageData.page.slug, data.page.slug)
                // Run code block content through prismjs
                if (data.page && Array.isArray(data.page.items)) {
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

function prismifyCodeBlocks(items) {
  items.forEach(item => {
    if (item.__typename === 'CodeBlockRecord' && item.body && item.language) {
      const { body, language } = item
      const unwrapped = body
        .replace(/(?:<pre>|<\/pre>)/g, '')
        .replace(/<br\s*\/>/g, '\\n')
      let prismified
      try {
        prismified = Prism.highlight(unwrapped, Prism.languages[language])
      } catch (e) {
        console.error(`Unable to prismify code block for language ${language}: ${e.message}`) // eslint-disable-line no-console
        return
      }
      item.body = prismified
    }
  })
}
