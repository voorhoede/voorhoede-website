<template>
  <figure>
    <iframe
      scrolling="no"
      :title="title"
      :src="iframeSrc"
      :id="id"
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

<script setup>
  const props = defineProps({
    id: {
      type: String,
      default: null
    },
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
    }
  })

  const iframeSrc = computed(() => {
    if (props.type ==='codepen') {
      const embedUrl = props.url.replace('/pen', '/embed/preview')
      return `${embedUrl}?default-tab=css%2Cresult`
    } else {
      return props.url
    }
  })
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

