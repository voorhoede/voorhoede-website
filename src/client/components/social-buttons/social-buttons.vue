<template>
  <div class="blog-author-social">
    <p class="blog-author-social__text body">{{ title }}</p>
    <ul class="blog-author-social--icon">
      <li class="blog-author-social-item--icon"
          v-for="socialItem in socialAside" :key="socialItem.href">
        <a :href="socialItem.href" target="_blank">
          <app-icon :name="socialItem.icon" :is-large="true" />
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
  import { AppIcon, } from '~/components'

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
        socialAside: [
              { icon: 'instagram--blue', href: 'https://www.instagram.com/devoorhoede/?hl=nl' },
              { icon: 'twitter--blue', href: 'https://twitter.com/devoorhoede' },
              { icon: 'facebook--blue', href: 'https://www.facebook.com/DeVoorhoede/' },
              { icon: 'git-hub--blue', href: 'https://github.com/voorhoede/' },
            ],
      }
    },
  }
</script>

<style>
  .blog-author-social-item--icon {
    display: inline-block;
    margin-right: var(--spacing-small);
  }

  @media (min-width: 720px) {
    .blog-author-social__text {
      margin-bottom: var(--spacing-smaller);
    }
  }
</style>

