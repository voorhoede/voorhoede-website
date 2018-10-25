<template>
  <div>
    <p class="social-buttons__text body">{{ title }}</p>
    <ul class="social-buttons__list">
      <li
        class="social-buttons__list-icon"
        v-for="item in socials" 
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
        socials: [
              { icon: 'instagram--blue', href: 'https://www.instagram.com/devoorhoede/?hl=nl', label: 'instagram' },
              { icon: 'twitter--blue', href: 'https://twitter.com/devoorhoede', label: 'twitter' },
              { icon: 'facebook--blue', href: 'https://www.facebook.com/DeVoorhoede/', label: 'facebook' },
              { icon: 'git-hub--blue', href: 'https://github.com/voorhoede/', label: 'github' },
            ],
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
