<template>
  <!-- the class is named notice instead of youtube-cookie-notice to prevent adblockers from hiding the content. -->
  <div class="notice">
    <div class="notice__inner">
      <p class="notice__title body-big">
        {{ $t('youtube_video_cookie_notice') }}
      </p>

      <app-button
        small
        :label="$t('play_youtube_video')"
        class="notice__cta"
        type="button"
        @click="handleCookieNoticeClick"
      />

      <a
        class="notice__body body-small link font-html-blue"
        :href="props.url"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ props.url }}
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  url: string;
  aspectRatio: number;
}

const props = defineProps<Props>();
const emit = defineEmits(['update']);

const emitUpdate = (value: boolean) => {
  emit('update', value)
}

const cookieChoice = ref(false);
const cookieKey = 'has_accepted_youtube_video_cookie'

onMounted(() => {
  const storedCookieChoice = getFromLocalStorage(cookieKey)
  emitUpdate(Boolean(storedCookieChoice))
})

const handleCookieNoticeClick = () => {
  cookieChoice.value = !cookieChoice.value
  emitUpdate(cookieChoice.value)
  setInLocalStorage(cookieKey, cookieChoice.value)
}

const getFromLocalStorage = (key: string): unknown | null => {
  const state = localStorage.getItem(key)
  if (state === null) { return null }
  return JSON.parse(state)
}

const setInLocalStorage = (key: string, state: any) => localStorage.setItem(key, JSON.stringify(state))
</script>

<style scoped>
.notice {
  display: grid;
  align-content: center;
  aspect-ratio: v-bind(aspectRatio);
  background-color: var(--paper);
}

.notice__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-inline: auto;
  max-inline-size: 80%;
}

.notice__title {
  text-align: center;
}

.notice__cta {
  margin-block-start: var(--spacing-large);
  margin-inline: auto;
}

.notice__body {
  margin-block-start: var(--spacing-small);
}
</style>
