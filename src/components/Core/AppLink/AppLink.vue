<script setup lang="ts">
import { type FragmentOf, readFragment } from '~/utils/graphql'
import { LinkFragment } from './AppLink.query'

const props = defineProps<{
  /** A CMS link record (InternalLinkRecord / ExternalLinkRecord). */
  link: FragmentOf<typeof LinkFragment>
}>()

// Resolve destination, external-ness, label and style from the record's `__typename`.
const resolved = computed(() => {
  const link = readFragment(LinkFragment, props.link)

  if (link.__typename === 'ExternalLinkRecord') {
    return { to: link.url, external: true, label: link.title, style: link.style }
  }
  if (link.__typename === 'InternalLinkRecord') {
    return { to: useDatoNuxtRoute(link.link) ?? '/', external: false, label: link.title, style: link.style }
  }
  return { to: '/', external: false, label: '', style: null }
})

const isSecondary = computed(() => resolved.value.style === 'secondary')

// The button variant is derived from the record's `style`. Extra classes the parent
// passes (e.g. layout) merge in via attribute fallthrough. The trailing arrow is
// rendered by CSS off the wrapped label (see <style> below + .app-button--primary).
const buttonClass = computed(() => [
  'app-button',
  'body',
  isSecondary.value ? 'app-button--secondary' : 'app-button--primary font-bold',
])

// Two root branches (v-if/v-else) disable automatic attribute fallthrough,
// so class/listeners are bound explicitly via `$attrs` on each branch.
defineOptions({ inheritAttrs: false })

const LinkWithTrailingSlash = defineNuxtLink({ trailingSlash: 'append' })

function trackExternalLink() {
  if (typeof resolved.value.to === 'string' && resolved.value.to.startsWith('tel:')) {
    useTrackEvent('Click on phone number')
  }
}
</script>

<template>
  <a
    v-if="resolved.external"
    v-bind="$attrs"
    :class="buttonClass"
    :href="(resolved.to as string)"
    target="_blank"
    rel="noopener noreferrer"
    @click="trackExternalLink"
  >
    <span>{{ resolved.label }}</span>
  </a>
  <LinkWithTrailingSlash
    v-else
    v-bind="$attrs"
    :class="buttonClass"
    :to="resolved.to"
  >
    <span>{{ resolved.label }}</span>
  </LinkWithTrailingSlash>
</template>

<style>
/*
 * Secondary buttons get a trailing arrow via the wrapped label, matching the literal
 * arrow the legacy AppButton rendered. Legacy secondary buttons render their label
 * without a span, so this only targets AppLink's wrapped label. (Primary already gets
 * its arrow from `.app-button--primary > span::after`.)
 */
.app-button--secondary > span::after {
  content: '\00a0\2192';
}
</style>
