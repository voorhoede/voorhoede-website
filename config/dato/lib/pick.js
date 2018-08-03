const curry = require('lodash/fp/curry')

module.exports = curry(
  (props, obj) =>
      props.reduce((result, prop) =>
        ({
          ...result,
          [prop]: obj[prop],
        }),
      {})
)
