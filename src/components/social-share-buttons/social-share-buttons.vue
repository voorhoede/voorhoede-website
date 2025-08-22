<template>
  <div>
    <p
      v-if="title"
      class="social-share-buttons__text body"
    >
      {{ title }}
    </p>
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
        >
          <app-icon
            :name="item.icon"
            :alt="item.alt"
            size="large"
          />
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: {
      baseUrl: {
        type: String,
        required: true,
      },
      authors: {
        type: Array,
        default: null,
      },
      title: {
        type: String,
        default: '',
      },
    },
    data () {
      return {
        hasNativeShare: false,
        url: new URL(this.$route.fullPath, this.baseUrl)
      }
    },
    computed: {
      blogAuthors () {
        return this.authors.map((author) => author.name).join(' ');
      },
      socials () {
        return [
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
        if (import.meta.client) {
          this.hasNativeShare = (typeof window.navigator.share === 'function')
          this.url = window.location.href
        }
      })
    },
    methods: {
      shareNative () {
        return navigator.share({ url: this.url })
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
    fill: var(--html-blue);
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
