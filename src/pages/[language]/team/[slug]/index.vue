<template>
  <main class="page-team grid">
    <header class="page-team__header">
      <dato-image
        class="page-team__image"
        :src="person.image.url"
        alt=""
        :width="person.image.width"
        :height="person.image.height"
        sizes="(min-width: 768px) 200px, 100px"
        loading="eager"
        :quality="75"
        :modifiers="{ ar: '1:1', fit: 'crop', crop: 'faces' }"
      />
      <div class="page-team__details">
        <div>
          <h1 class="h2">
            {{ person.name }} {{ person.lastName }}
          </h1>
          <p
            class="body"
            v-if="person.biography"
          >
            {{ person.biography }}
          </p>
        </div>

        <ul class="page-team__links">
          <li
            v-for="link in person.links"
            :key="link.title"
          >
            <a
              :href="link.url"
              target="_blank"
              rel="noopener"
              class="body-small page-team__link"
            >
              {{ link.title }}
            </a>
          </li>
        </ul>
      </div>
    </header>

    <ul
      v-if="transformedBlogposts"
      class="page-team__blogs"
    >
      <li
        v-for="blogPost in transformedBlogposts"
        :key="blogPost.id"
        class="page-team__blog"
      >
        <app-link
          :to="{ name: 'language-blog-slug', params: {
            language: blogPost.locale,
            slug: blogPost.slug
          }}"
          :hreflang="blogPost.locale"
        >
          <div class="page-team__blog-details">
            <span class="body page-team__date">{{ formattedDate(blogPost.date) }}</span>
            <h2
              class="h3 page-team__blog-title"
              :lang="blogPost.locale"
            >
              {{ blogPost.title }}
            </h2>
            <p
              class="body page-team__blog-content"
              :lang="blogPost.locale"
            >
              {{ blogPost.introTitle }}
            </p>
          </div>
        </app-link>
      </li>
    </ul>
  </main>
</template>

<script setup>
definePageMeta({ layout: 'content-page' });

import formatDate from '../../../../lib/format-date';
import personQuery from './index.person.graphql?raw';
import blogPostsQuery from './index.blogPosts.graphql?raw';

const route = useRoute()

const { data: { value: { person } } } = await useFetchContent({
  key: ['person', route.name, ...Object.values(route.params)].filter(Boolean).join('-'),
  query: personQuery,
  variables: {
    slug: route.params.slug,
    locale: route.params.language,
  },
})

if (!person) {
  throw createError({ statusCode: 404, fatal: true });
}

const { data: blogs } = await useFetchContent({
  key: ['blogs', route.name, ...Object.values(route.params)].filter(Boolean).join('-'),
  query: blogPostsQuery,
  variables: {
    personId: person.id,
  },
})

const transformedBlogposts = computed(() => {
  return blogs.value.blogPosts.map((blogPost) => ({
    ...blogPost,
    locale: blogPost._allSlugLocales.find((locale) => locale.value === blogPost.slug).locale,
  }))
})


const formattedDate = (date) => formatDate({ date, locale: route.params.language, format: 'D MMM YYYY' })

useSeoHead({
  ...route.params,
  social: {
    title: person.name,
    description: person.biography,
  }
})
</script>

<style>
  :root {
    --time-line-bullet-size: 12px;
    --image-size: 200px;
    --content-size: 500px;
  }

  .page-team__header {
    display: flex;
    position: relative;
    padding-top: var(--spacing-bigger);
    padding-bottom: var(--spacing-small);
    gap: var(--spacing-small);
    background-color: var(--bg-pastel);

    grid-column: var(--grid-page);
  }

  @media screen and (min-width: 1100px) {
    .page-team__header {
      justify-content: center;
    }
  }

  .page-team__image {
    width: calc(var(--image-size) / 2);
    height: calc(var(--image-size) / 2);
    object-fit: cover;
    z-index: var(--z-index-high);
  }

  @media (min-width: 768px) {
    .page-team__image {
      width: var(--image-size);
      height: var(--image-size);
    }
  }

  .page-team__details {
    display: flex;
    flex-direction: column;
  }

  @media (min-width: 768px) {
    .page-team__details {
      width: var(--content-size);
    }
  }

  .page-team__links {
    margin-top: var(--spacing-small);
    list-style: none;
  }

  .page-team__link {
    display: inline-block;
    width: fit-content;
    padding-bottom: .15rem;
    margin-bottom: 0.6rem;
    color: var(--html-blue);
    background: transparent linear-gradient(to top, transparent 1px, var(--html-blue) 1px, var(--html-blue) 2px, transparent 2px);
  }

  .page-team__link:hover,
  .page-team__link:focus {
    color: var(--active-blue);
    background: transparent linear-gradient(to top, var(--html-blue) 2px, transparent 2px);
  }

  .page-team__blogs {
    grid-column-start: 3;
    margin: var(--spacing-medium) auto;
  }

  @media (min-width: 768px) {
    .page-team__blogs {
      grid-column-start: 6;
    }
  }

  @media (min-width: 1100px) {
    .page-team__blogs {
      grid-column-start: 16;
      grid-column-end: 40;
    }
  }

  .page-team__date {
    color: var(--off-black);
  }

  .page-team__blog-details {
    position: relative;
    padding-left: var(--spacing-medium);
    margin-bottom: var(--spacing-medium);
  }

  .page-team__blog-title {
    position: relative;
    transition: transform 0.3s ease;
  }

  .page-team__blog-link:hover .page-team__blog-title,
  .page-team__blog-link:focus .page-team__blog-title {
    transform: translateX(20px);
  }

  .page-team__blog {
    position: relative;
  }

  /* bulletin styling */
  .page-team__blog::before {
    content: "";
    position: absolute;
    left: calc(-1 * calc(var(--spacing-medium)) + calc(-1 * var(--time-line-bullet-size) / 2));
    left: -5px;
    top: 30px;
    width: var(--time-line-bullet-size);
    height: var(--time-line-bullet-size);
    border-radius: var(--time-line-bullet-size);
    background-color: var(--html-blue);
    z-index: var(--z-index-low);
  }

  /* vertical line styling */
  .page-team__blog::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 150%;
    width: 1px;
    transform: translateY(-50px);
    background-color: var(--html-blue);
  }

  .page-team__blog-content {
    display: none;
  }

  @media (min-width: 768px) {
    .page-team__blog-content {
      display: block;
      color: var(--off-black);
    }
  }
</style>
