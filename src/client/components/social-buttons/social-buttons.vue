<template>
  <div>
    <p class="social-buttons__text body">{{ title }}</p>
    <app-button
      v-if="hasNativeShare"
      label="Share"
      small
      @click="share"
    />
    <ul
      v-else
      class="social-buttons__list"
    >
      <li
        class="social-buttons__list-icon"
        v-for="item in socials"
        :key="item.href"
      >
        <a
          :href="item.href"
          target="_blank"
          rel="noreferrer noopener"
          :aria-label="item.label"
        >
          <app-icon :name="item.icon" :is-large="true" :alt="item.alt" />
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
  import { AppIcon, AppButton } from '../../components'

  export default {
    components: { AppIcon, AppButton },
    props: {
      title: {
        type: String,
        default: '',
      },
      shareTitle: {
        type: String,
        default: '',
      },
    },
    data () {
      return {
        hasNativeShare: false,
        url: `${process.env.URL}${this.$route.fullPath}`
      }
    },
    computed: {
      socials () {
        return [
          { icon: 'twitter--blue',
            href: `https://twitter.com/intent/tweet?text=${this.shareTitle}&url=${this.url}`,
            label: 'twitter',
            alt: 'Share this post on Twitter',
          },
          { icon: 'facebook--blue',
            href: `https://www.facebook.com/sharer.php?u=${this.url}`,
            label: 'facebook',
            alt: 'Share this post on Facebook',
          },
        ]
      },
    },
    created () {
      this.$nextTick(() => {
        if (process.browser) {
          this.hasNativeShare = (typeof window.navigator.share === 'function')
          this.url = window.location.href
        }
      })
    },
    methods: {
      share () {
        const url = this.url
        return navigator.share({ url })
      }
    },

  }
</script>

<style>

  .social-buttons__text {
    display: none;
  }

  .social-buttons__list-icon {
    display: inline-block;
    margin-right: var(--spacing-small);
  }

  .social-buttons__list-icon:last-of-type {
    margin: 0;
  }

  @media (min-width: 720px) {
    .social-buttons__text {
      display: block;
      margin-bottom: var(--spacing-smaller);
    }

    .social-buttons__list-icon:last-of-type {
      margin: 0;
    }
  }
</style>
