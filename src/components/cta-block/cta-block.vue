<template>
  <div class="cta-block">
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
    :key="'else' + item.id"
    :title="item.title"
    :body="item.body"
    :link-label="item.linkLabel"
    :link-url="item.linkUrl"
  />
  </div>
</template>

<script>

  export default {
    props: {
      item: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style>
.cta-block {
  margin-left: var(--spacing-small);
  margin-right: var(--spacing-small);
}
@media (min-width: 768px) {
  .cta-block {
    width: fit-content;
  }
}
</style>
