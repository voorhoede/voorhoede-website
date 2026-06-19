<template>
  <vue-dato-video
    v-if="showVideo"
    class="responsive-video"
    v-bind="{ video: data.video, autoplay: data.autoplay, loop: data.loop, mute: data.mute }"
    :play-icon-alt="$t('play_video')"
  >
    <template #caption>
      <div class="responsive-video__caption-container">
        <a
          class="body-detail link"
          :href="data.video.url"
          target="_blank"
          rel="noopener"
        >
          {{ data.caption || data.video.title }}
        </a>
      </div>
    </template>
    <template #playIcon>
      <AppIcon name="play" />
    </template>
  </vue-dato-video>

  <YoutubeCookieNotice
    v-else
    :url="data.video.url"
    :aspect-ratio="videoAspectRatio"
    @update="handleCookieNoticeUpdate"
  />
</template>

<script setup lang="ts">
import "@voorhoede/vue-dato-video/style";
import { VueDatoVideo } from "@voorhoede/vue-dato-video";
import { type ResponsiveVideoFragment } from "./ResponsiveVideo.query";
import { type FragmentOf, readFragment } from "~/utils/graphql";
import AppIcon from "~/components/app-icon/app-icon.vue";
import YoutubeCookieNotice from "~/components/youtube-cookie-notice/youtube-cookie-notice.vue";

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<{
  data: FragmentOf<typeof ResponsiveVideoFragment>;
}>();

const data = readFragment<typeof ResponsiveVideoFragment>(props.data);

const showVideo = ref(data.video.provider === 'vimeo');
const videoAspectRatio = data.video.width / data.video.height;

const handleCookieNoticeUpdate = (value: boolean) => {
  showVideo.value = value;
};
</script>

<style scoped>
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
