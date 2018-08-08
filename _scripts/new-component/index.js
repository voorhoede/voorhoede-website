const { promisify } = require('util')
const readFile = promisify(require('fs').readFile)
const writeFile = promisify(require('fs').writeFile)
const mkdirSync = require('fs').mkdirSync
const existsSync = require('fs').existsSync
const readdirSync = require('fs').readdirSync
const path = require('path')
const program = require('commander')
const curry = require('lodash/fp/curry')
const pipe = require('lodash/fp/pipe')
const kebabCase = require('lodash/kebabCase')
const camelCase = require('lodash/camelCase')
const startCase = require('lodash/startCase')
const pascalCase = str => startCase(str).replace(/\s/g, '')
const replaceInFile = curry((regexp, replacement, contents) =>
  contents.replace(regexp, replacement),
)
const mockFiles = readdirSync(__dirname).filter(file => /_/.test(file))

program
  .option('-c, --component <name>', 'Component name')
  .option(
    '-d, --component-directory, <dir>',
    'Component Directory',
    path.join(__dirname, '../../src/client/components'),
  )
  .parse(process.argv)

const nameCamel = camelCase(program.component)
const nameKebab = kebabCase(program.component)
const namePascal = pascalCase(program.component)
const nameStart = startCase(program.component)

const replaceCamel = replaceInFile(/__\s?NAME_CAMEL\s?__/g, nameCamel)
const replaceKebab = replaceInFile(/__\s?NAME_KEBAB\s?__/g, nameKebab)
const replacePascal = replaceInFile(/__\s?NAME_PASCAL\s?__/g, namePascal)
const replaceStart = replaceInFile(/__\s?NAME_START\s?__/g, nameStart)

const replacePlaceholders = pipe(
  replaceCamel,
  replaceKebab,
  replacePascal,
  replaceStart,
)

const writeToFile = curry(
  async (componentDir, componentName, fileName, contents) => {
    const pathName = path.join(
      componentDir,
      componentName,
      fileName.replace('_', '').replace('component', componentName),
    )
    return await writeFile(pathName, contents)
  },
)

const writeComponentFile = writeToFile(program.componentDirectory, nameKebab)

const writeComponent = async mockFile =>
  readFile(path.join(__dirname, mockFile), 'utf8')
    .then(replacePlaceholders)
    .then(writeComponentFile(mockFile))

if (nameKebab.split('-').length === 1) {
  console.log('⚠️  Your component name can not be a single word!\n') //eslint-disable-line no-console
  process.exit(0)
}

if (existsSync(`${program.componentDirectory}/${nameKebab}`)) {
  console.log(`️⚠️  There is already a component called ${nameKebab}!\n`) //eslint-disable-line no-console
  process.exit(0)
}

mkdirSync(`${program.componentDirectory}/${nameKebab}`)
mockFiles.forEach(writeComponent)

readFile(path.join(__dirname, '../../src/client/components/index.js'), 'utf8')
  .then(contents => contents
    .split('\n')
    .concat(`export { default as ${namePascal} } from './${nameKebab}'`)
    .filter(line => line !== '')
    .sort()
    .concat('')
    .join('\n')
  )
  .then(contents => writeFile(path.join(__dirname, '../../src/client/components/index.js'), contents))
