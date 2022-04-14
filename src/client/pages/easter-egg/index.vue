<template>
  <h1>
    Easter Game
  </h1>
</template>

<script>
  import head from '~/lib/seo-head'
  export default {
    data() {
      return {
        page: {
          social: {
            title: 'Happy easter!',
            description: 'Join the easter egg hunt on voorhoede.nl',
            image: {
              url: 'https://images.unsplash.com/photo-1638913658179-18c9a9c943f7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80'
            }
          }
        }
      }
    },
    head,
  }
</script>

<style></style>
