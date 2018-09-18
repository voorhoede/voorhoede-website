<template>
  <div class="blog-author">
    <div class="blog-author__container">
      <app-image class="blog-author__image" v-for="author in item.authors" :key="author.name" :image="author.image"/>
    </div>
    <div class="blog-author__text body">
      <span class="font-html-blue">{{ authorName }}</span>
      <time
        datetime="item.date"
      >
        {{ formattedDate }}
      </time>
    </div>
    <div class="blog-author-social">
      <p class="blog-author-social__text body">{{ item.socialTitle }}</p>
      <ul class="blog-author-social--icon">
        <li class="blog-author-social-item--icon"
            v-for="socialItem in socialAside" :key="socialItem.href">
          <a :href="socialItem.href" target="_blank">
            <app-icon :name="socialItem.icon" :is-large="true" />
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { AppImage, AppIcon, } from '~/components'

  export default {
    components: { AppImage, AppIcon, },
    props: {
      item: {
        type: Object,
        required: true,
        validator(item) {
          return typeof(item.slug) === 'string' && 
                 typeof(item.title) === 'string' && 
                 !!Date.parse(item.date) && 
                 item.authors.length >= 1
        },
      },
      large: {
        type: Boolean,
        default: false,
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
    computed: {
      ...mapState([
        'currentLocale',
      ]),
      authorName() {
        return `by ${this.item.authors.map(author => author.name).join(', ')} -`
      },
      formattedDate() {
        return new Date(this.item.date).toLocaleString(this.currentLocale, { day: 'numeric', year: 'numeric', month: 'long' })
      },
    },
  }
</script>

<style>
   :root {
    --thumbnail-size: 135px;
  }

  .blog-author {
    display: flex;
    justify-content: space-between;
    margin-bottom: var(--spacing-medium);
  }

  .blog-author__text {
    margin-right: var(--spacing-small);
    color: var(--dim);
  }

  .blog-author__container {
    display: none;
    margin-bottom: var(--spacing-small);
  }

  .blog-author__image {
    max-width: var(--thumbnail-size);
    margin: 0 0 var(--spacing-tiny);
  }

  .blog-author-social-item--icon {
    display: inline-block;
    margin-right: var(--spacing-small);
  }

  @media (min-width: 720px) {
    .blog-author {
      display: block;
    }

    .blog-author__container {
      display: block;
      border-right: 1px solid var(--very-dim);
    }

    .blog-author__text {
      display: flex;
      flex-direction: column;
      margin-bottom: var(--spacing-large);
    }

    .blog-author-social__text {
      margin-bottom: var(--spacing-smaller);
    }
  }
</style>
