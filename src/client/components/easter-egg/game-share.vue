<template>
  <div>
    <aside
      class="game-share"
    >
      <h3 class="body-small">
        {{ translations.shareTitle[$i18n.locale] }}
      </h3>
      <ul class="game-share__options">
        <li
          v-for="option in shareOptions"
          :key="option.name"
        >
          <a
            :href="option.url"
            target="_blank"
            rel="noopnener noreferrer"
            class="game-share__option"
            :aria-label="`Share on ${option.name}`"
          >
            <app-icon :name="option.icon" alt="" />
          </a>
        </li>
      </ul>
    </aside>
  </div>
</template>

<script>
import { getTwitterUrl, getFacebookUrl, getLinkedinUrl } from '@/lib/share-url-helpers'
import translations from './game-translations'

export default {
  props: {
    shareText: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      shareUrl: 'https://www.voorhoede.nl/easter-egg',
      translations
    }
  },

  computed: {
    shareOptions() {
      return [
        {
          name: 'Facebook',
          url: getFacebookUrl(this.shareUrl, this.shareText),
          icon: 'facebook'
        },
        {
          name: 'Twitter',
          url: getTwitterUrl(this.shareUrl, this.shareText),
          icon: 'twitter'
        },
        {
          name: 'Linkedin',
          url: getLinkedinUrl(this.shareUrl, this.shareText),
          icon: 'linkedin'
        }
      ]
    }
  }
}
</script>

<style src="./game-share.css"></style>
