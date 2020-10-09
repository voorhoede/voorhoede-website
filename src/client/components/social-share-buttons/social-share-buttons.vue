<template>
  <div>
    <p v-if="title" class="social-share-buttons__text body">{{ title }}</p>
    <app-button
      v-if="hasNativeShare"
      label="Share"
      small
      @click="shareNative"
    />
    <ul
      v-else
      class="social-share-buttons__list"
    >
      <li
        class="social-share-buttons__list-icon"
        v-for="item in socials"
        :key="item.href"
      >
        <a
          :href="item.href"
          target="_blank"
          rel="noreferrer noopener"
          :aria-label="item.label"
          @click="trackShare(item.label)"
        >
          <app-icon :name="item.icon" is-large :alt="item.alt" />
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
  import AppIcon from '../app-icon'
  import AppButton from '../app-button'

  export default {
    components: { AppIcon, AppButton },
    props: {
      authors: {
        type: Array,
        default: null,
      },
      title: {
        type: String,
        default: '',
      },
      twitterTitle: {
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
      blogAuthors () {
        return this.authors.map(author => {
          return author.twitterHandle ? author.twitterHandle : author.name
        }).join(' ')
      },
      socials () {
        return [
          { icon: 'twitter',
            href: `https://twitter.com/intent/tweet?text=${this.twitterTitle} by ${this.blogAuthors} @devoorhoede&url=${this.url}`,
            label: 'twitter',
            alt: 'Share this post on Twitter',
          },
          { icon: 'facebook',
            href: `https://www.facebook.com/sharer.php?u=${this.url}`,
            label: 'facebook',
            alt: 'Share this post on Facebook',
          },
          {
            icon: 'linkedin',
            href: `https://www.linkedin.com/shareArticle?&url=${this.url}&title=${this.title}`,
            label: 'linkedin',
            alt: 'Share this post on LinkedIn'
          }
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
      shareNative () {
        const url = this.url
        this.$ga.social('native', 'share', url)
        return navigator.share({ url })
      },
      trackShare(platform) {
        this.$ga.social(platform, 'share', this.url)
      },
    },

  }
</script>

<style>
  .social-share-buttons__text {
    display: none;
  }

  .social-share-buttons__list-icon {
    display: inline-block;
    margin-right: var(--spacing-small);
    color: var(--html-blue);
  }

  .social-share-buttons__list-icon:last-of-type {
    margin: 0;
  }

  @media (min-width: 720px) {
    .social-share-buttons__text {
      display: block;
      margin-bottom: var(--spacing-smaller);
    }

    .social-share-buttons__list-icon:last-of-type {
      margin: 0;
    }
  }
</style>
