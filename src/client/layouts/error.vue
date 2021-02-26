<template>
  <error-page/>
</template>

<script>
  const DEFAULT_STATUSCODE = 404
  export default {
    props: {
      error: {
        type: [Object, Error],
        required: false,
        validator(error) {
          return typeof(error.statusCode) === 'number'
        },
        default: () => ({
          statusCode: DEFAULT_STATUSCODE,
        })
      },
    },
    head () {
      return {
        title: `${this.error ? this.error.statusCode : DEFAULT_STATUSCODE} | De Voorhoede`
      }
    }
  }
</script>
