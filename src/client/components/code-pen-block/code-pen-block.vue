<template>
  <figure>
    <iframe
      scrolling="no"
      :title="title"
      :src="iframeSrc"
      class="code-pen-block__i-frame"
      frameborder="no"
      loading="lazy"
      allowtransparency="true"
      allowfullscreen="true"
    >
    </iframe>
    <figcaption class="code-pen-block__caption body-detail">
      {{ caption }}
    </figcaption>
  </figure>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    caption: {
      type: String,
      required: false,
      default: ''
    },
    url: {
      type: String,
      required: true
    }
  },
  computed: {
    iframeSrc() {
      const embedUrl = this.url.replace('/pen', '/embed/preview')
      return `${embedUrl}?default-tab=css%2Cresult`
    }
  }
}
</script>

<style>
  .code-pen-block__i-frame {
    width: 100%;
    height: 25rem;
  }

  .code-pen-block__caption {
    margin-top: var(--spacing-smaller);
    text-align: center;
  }
</style>
