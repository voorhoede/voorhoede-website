<template>
  <div class="custom-script">
    <!-- we show a <noscript> element if the user has javascript disabled, this is necessary because some functionality might be broken due to javascript being disabled and its important that users are notified why it isn't working -->
    <!-- this needs to be v-html instead of your typical {{ someValue }} interpolation because of a bug that content in noscript does not seem to be evaluated by Vue -->
    <noscript
      v-html="$t('blog_post_noscript')"
      class="rich-text body-big"
    />
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    script: string;
  }>()

  onMounted(() => {
    const script = document.createElement('script');
    script.innerHTML = props.script;
    document.body.appendChild(script);
  });
</script>

<style>
.custom-script {
  margin-block-start: var(--spacing-medium);
  padding: var(--spacing-larger);
  background: var(--base2);
}
</style>
