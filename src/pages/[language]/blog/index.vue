<script setup>
definePageMeta({
  middleware: [
    // eslint-disable-next-line no-unused-vars
    function (to, from) {
      return navigateTo({ name: 'language-blog-page-page', params: { page: 1 }})
    },
  ],
});
</script>