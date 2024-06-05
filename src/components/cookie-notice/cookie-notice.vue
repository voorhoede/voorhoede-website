<template>
  <div class="cookie-notice">
    <div class="cookie-notice__inner">
      <p class="cookie-notice__title body-big">
        {{ props.title }}
      </p>

      <app-button
        small
        :label="props.cta"
        class="cookie-notice__cta"
        type="button"
        @click="handleCookieNoticeClick"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  cta: string;
}

const props = defineProps<Props>()
const emit = defineEmits(['update']);

const emitUpdate = (value: boolean) => {
  emit('update', value)
}

const cookieChoice = ref(false);
const cookieKey = 'has_accepted_video_cookie'

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

<style>
.cookie-notice {
  display: grid;
  align-content: center;
  inline-size: 100%;
  block-size: 250px;
  max-inline-size: var(--page-section-max-width);
  background-color: var(--paper);
}

.cookie-notice__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-inline: auto;
  max-inline-size: 80%;
}

.cookie-notice__title {
  text-align: center;
}

.cookie-notice__cta {
  margin-block-start: var(--spacing-large);
  margin-inline: auto;
}
</style>
