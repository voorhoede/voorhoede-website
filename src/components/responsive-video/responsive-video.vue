<template>
  <vue-dato-video
    class="responsive-video"
    v-bind="$attrs"
    :play-icon-alt="playIconAlt"
  >
    <template #caption>
      <div class="caption-container">
        <a
          class="body-detail link"
          :href="$attrs.video.url"
          target="_blank"
          rel="noopener"
        >
          {{ $attrs.video.title }}
        </a>
      </div>
    </template>
    <template #playIcon>
      <app-icon name="play" />
    </template>
  </vue-dato-video>
</template>

<script setup>
import "@voorhoede/vue-dato-video/dist/style.css";
import { VueDatoVideo } from "@voorhoede/vue-dato-video";

defineOptions({
  inheritAttrs: false,
});

const { $i18n } = useNuxtApp();
const locale = $i18n.locale();

const playIconAlt = computed(() =>
  locale === "en" ? "play video" : "video afspelen"
);
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
