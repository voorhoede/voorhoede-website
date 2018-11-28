<template>
  <div>
    <p class="social-buttons__text body">{{ title }}</p>
    <ul class="social-buttons__list">
      <li
        class="social-buttons__list-icon"
        v-for="item in sharePost ? socialsBlogPost : socials"
        :key="item.href">
        <a
          :href="item.href"
          target="_blank"
          :aria-label="item.label">
          <app-icon :name="item.icon" :is-large="true" />
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
  import { AppIcon, } from '../../components'

  export default {
    components: { AppIcon, },
    props: {
      title: {
        type: String,
        default: '',
      },
      sharePost: {
        type: Boolean,
        default: false,
      },
      shareTitle: {
        type: String,
        default: '',
      },
      social: {
        type: Array,
        default: () => [],
        validator: (social) => {
          return (
            social.every(item => {
              return item instanceof Object &&
                typeof item.icon === 'string' &&
                typeof item.href === 'string'
            })
          )
        },
      },
    },
    data() {
      return {
        currentUrl: ''
      }
    },
    computed : {
      socials() {
        return [
          { icon: 'instagram--blue', href: 'https://www.instagram.com/devoorhoede/?hl=nl', label: 'instagram' },
          { icon: 'twitter--blue', href: 'https://twitter.com/devoorhoede', label: 'twitter' },
          { icon: 'facebook--blue', href: 'https://www.facebook.com/DeVoorhoede/', label: 'facebook' },
          { icon: 'git-hub--blue', href: 'https://github.com/voorhoede/', label: 'github' },
        ]
      },
      socialsBlogPost () {
        return [
          { icon: 'twitter--blue',
            href: `https://twitter.com/intent/tweet?text=${this.shareTitle}&url=${this.currentUrl}`,
            label: 'twitter',
          },
          { icon: 'facebook--blue',
            href: `https://www.facebook.com/sharer.php?u=${this.currentUrl}`,
            label: 'facebook',
          },
        ]
      },
    },
    created () {
      // needs to be done to update the dom with the correct value
      this.$nextTick(() => {
        if(process.client) {
          this.currentUrl = window.location.href
        }
      })
    }
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
