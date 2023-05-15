<template>
  <figure>
    <iframe
      scrolling="no"
      :title="title"
      :src="iframeSrc"
      :id="slug"
      class="code-preview-block__i-frame"
      frameborder="no"
      loading="lazy"
      allowtransparency="true"
      allowfullscreen="true"
    />
    <figcaption class="code-preview-block__caption body-detail">
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
    },
    type: {
      type: String,
      default: 'codepen'
    },
    slug: {
      type: String,
      default: null
    }
  },
  computed: {
    iframeSrc() {
      if (this.type ==='codepen') {
        const embedUrl = this.url.replace('/pen', '/embed/preview')
        return `${embedUrl}?default-tab=css%2Cresult`
      } else {
        return this.url
      }
    },
    cardTitle() {
      switch (this.type) {
        case 'codepen': {
          return 'CodePen'
        }
        case 'codesandbox': {
          return 'CodeSandbox'
        }
        default: {
          return this.type
        }
      }
    },
  },
}
</script>

<style>
  .code-preview-block__i-frame {
    width: 100%;
    height: 25rem;
  }

  .code-preview-block__caption {
    margin-top: var(--spacing-smaller);
    text-align: center;
  }
</style>

