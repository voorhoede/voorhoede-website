<template>
  <div>
    <cta-image-block
      v-if="Boolean(modularItem.person)"
      :key="modularItem.id"
      :title="modularItem.title"
      :body="modularItem.body"
      :link-label="modularItem.linkLabel"
      :link-url="modularItem.linkUrl"
      :person-image="modularItem.person.image"
      :person-name="modularItem.person.name"
    />

    <blockquote-block
      v-if="Boolean(!modularItem.person)"
      :key="modularItem.id"
      :title="modularItem.title"
      :body="modularItem.body"
      :link-label="modularItem.linkLabel"
      :link-url="modularItem.linkUrl"
    />
  </div>
</template>

<script>
  import CtaImageBlock from '../cta-image-block'
  import BlockquoteBlock from '../blockquote-block'

  export default {
    components: {
      BlockquoteBlock,
      CtaImageBlock,
    },
    props: {
      modularItem: {
        type: Object,
        required: true
      }
    }
  }
</script>
