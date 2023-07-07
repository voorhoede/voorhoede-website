<template>
  <vue-dato-video
    class="responsive-video"
    v-bind="props"
    :play-icon-alt="$t('play_video')"
  >
    <template #caption>
      <div class="caption-container">
        <a
          class="body-detail link"
          :href="props.video.url"
          target="_blank"
          rel="noopener"
        >
          {{ props.video.title }}
        </a>
      </div>
    </template>
    <template #playIcon>
      <app-icon name="play" />
    </template>
  </vue-dato-video>
</template>

<script setup lang="ts">
import "@voorhoede/vue-dato-video/style";
import { VueDatoVideo } from "@voorhoede/vue-dato-video";

defineOptions({
  inheritAttrs: false,
});

type VueDatoVideoProps = InstanceType<typeof VueDatoVideo>["$props"];

const props = defineProps<Omit<VueDatoVideoProps, "playIconAlt">>()
</script>

<style>
.responsive-video .caption-container {
  margin-top: 0.5rem;
  text-align: center;
}

.responsive-video .app-icon {
  position: absolute;
  display: block;
  top: 50%;
  left: 50%;
  width: 60px;
  height: 60px;
  transform: translate(-50%, -50%);
}

.responsive-video .app-icon svg {
  width: 100%;
  height: 100%;
}
</style>
