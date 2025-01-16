<template>
  <div class="custom-script">
    <!-- we show a <noscript> element if the user has javascript disabled, this is necessary because some functionality might be broken due to javascript being disabled and its important that users are notified why it isn't working -->
    <!-- this needs to be v-html instead of your typical {{ someValue }} interpolation since that would not be to be evaluated by Vue -->
    <noscript
      v-html="$t('blog_post_noscript')"
      class="rich-text body-big"
    />
  </div>
</template>

<script lang="ts" setup>
  import { nanoid } from 'nanoid';

  const props = defineProps<{
    mountScript: string;
    unmountScript?: string;
  }>()

  const onMountScriptId = nanoid()
  const onUnmountScriptId = nanoid()

  onMounted(() => {
    runScriptInBrowser(props.mountScript, onMountScriptId);
  });

  onUnmounted(() => {
    const mountScript = document.getElementById(onMountScriptId);
    mountScript?.remove();

    if (props.unmountScript) {
      const unmountScript = runScriptInBrowser(props.unmountScript, onUnmountScriptId);

      unmountScript?.remove();
    }
  });

  function runScriptInBrowser(code: string, id: string) {
      const script = document.createElement('script');

      script.innerHTML = `(function() { ${code} })()`;
      script.setAttribute('id', id);

      document.body.appendChild(script);

      return script;
  }
</script>

<style>
.custom-script {
  margin-block-start: var(--spacing-medium);
  padding: var(--spacing-larger);
  background: var(--base2);
}
</style>
