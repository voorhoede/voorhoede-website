<template>
  <cta-image-block
    v-if="Boolean(item.person)"
    :key="item.id"
    :title="item.title"
    :body="item.body"
    :link-label="item.linkLabel"
    :link-url="item.linkUrl"
    :link-is-external="item.linkIsExternal"
    :secondary-link-label="item.secondaryLinkLabel"
    :secondary-link-url="item.secondaryLinkUrl"
    :secondary-link-is-external="item.secondaryLinkIsExternal"
    :person-image="item.person.image"
    :person-name="item.person.name"
  />

  <blockquote-block
    v-else
    :key="item.id"
    :title="item.title"
    :body="item.body"
    :link-label="item.linkLabel"
    :link-url="item.linkUrl"
  />
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
      item: {
        type: Object,
        required: true
      }
    }
  }
</script>
