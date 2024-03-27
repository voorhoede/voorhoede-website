<template>
  <vue-dato-video
    v-if="props.video"
    class="responsive-video"
    v-bind="props"
    :play-icon-alt="$t('play_video')"
  >
    <template #caption>
      <div class="responsive-video__caption-container">
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

interface Video {
  provider: "youtube" | "vimeo";
  providerUid: string;
  title: string;
  url: string;
  width: number;
  height: number;
  thumbnailUrl: string;
}

interface Props {
  video: Video;
  autoplay: boolean;
  loop: boolean;
  mute: boolean;
}

const props = defineProps<Props>()
</script>

<style>
.responsive-video__caption-container {
  margin-top: var(--spacing-smaller);
  text-align: center;
}

.responsive-video .vue-dato-video__button {
  display: flex;
  align-items: center;
  justify-content: center;
}

.responsive-video .app-icon {
  width: 60px;
  height: 60px;
}

.responsive-video .app-icon svg {
  width: 100%;
  height: 100%;
}
</style>
