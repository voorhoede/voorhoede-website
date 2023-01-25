<template>
  <main class="page-lustrum grid">
    <page-header
      class="page-lustrum__header"
      heading="byline"
      :byline="data.page.title"
      :headline="data.page.subtitle"
      :image="data.page.headerIllustration"
    />

    <image-with-text-block
      :title="data.page.introTitle"
      :body="data.page.introBody"
      :image="data.page.introImage"
    />

    <div class="page-lustrum__facts">
      <h2 class="page-lustrum__title-facts h3">{{ data.page.factsTitle }}</h2>
      <ul class="page-lustrum__facts-list">
        <tag-item
          v-for="fact in data.page.factsList"
          :key="fact.id"
          :amount="fact.amount"
          :label="fact.label"
        />
      </ul>
    </div>

    <image-with-text-block
      :title="data.page.middleTitle"
      :body="data.page.middleBody"
      :image="data.page.middleImage"
      :inverse="true"
    />

    <div class="page-lustrum__quote grid">
      <cta-block :item="data.page.quote[0]"/>
    </div>

    <div class="page-lustrum__timeline grid">
      <timeline-block :items="data.page.timeline" />
    </div>

    <image-grid
      :title="data.page.teamGridTitle"
      :items="data.page.teamGrid"
    />

    <div class="page-lustrum__list">
      <h2 class="page-lustrum__title-events h3">{{ data.page.eventsTitle }}</h2>
      <ul>
        <li
          v-for="event in data.page.eventsList"
          :key="event.id">
          <event-list-item :event="event"/>
        </li>
      </ul>
    </div>

    <highlighted-clients
      :title="data.page.clientsTitle"
      :light="true"
    />

    <div class="page-lustrum__list">
      <h2 class="page-lustrum__title-blogs h3">{{ data.page.blogsTitle }}</h2>
      <ul>
        <li v-for="blogPost in data.page.blogsList.filter(post => post.published)" :key="blogPost.slug">
          <blog-list-item large :item="blogPost" />
        </li>
      </ul>
    </div>
  </main>
</template>

<script setup>
  import query from './index.query.graphql?raw';

  const { params } = useRoute();

  const { data } = await useFetchContent({
    query,
    variables: {
      locale: params.language,
    },
  });

  useSeoHead(data.value.page);
</script>

<style>
  .page-lustrum {
    background-color: var(--bg-pastel);
  }

  .page-lustrum > *,
  .page-lustrum > *.highlighted-clients {
    margin-bottom: var(--spacing-bigger);
  }

  .page-lustrum > .page-lustrum__header {
    margin-bottom: var(--spacing-big);
  }

  .page-lustrum .image-with-text__body-text a {
    z-index: 1;
    display: inline-block;
    position: relative;
    margin-top: var(--spacing-medium);
    padding: .85rem 1.5rem .7rem 1.5rem;
    color: var(--white);
    line-height: 1.18;
    text-decoration: none;
    white-space: nowrap;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    cursor: pointer;
  }

  .page-lustrum .image-with-text__body-text a::before {
    content: '';
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--html-blue);
    border-radius: var(--border-radius);
    transition: transform var(--app-button-duration);
    transform: scaleX(1) scaleY(1);
  }

  .page-lustrum .image-with-text__body-text a:hover::before,
  .page-lustrum .image-with-text__body-text a:focus::before {
    transform: scaleX(1.05) scaleY(1.3);
  }

  .page-lustrum__quote .cta-image-block {
    margin-bottom: 0;
  }

  .page-lustrum .highlighted-clients {
    grid-column-start: var(--grid-page-start);
    grid-column-end: var(--grid-page-end);
  }

  .page-lustrum__title-facts,
  .page-lustrum__title-events {
    text-align: center;
    margin-bottom: var(--spacing-large);
  }

  .page-lustrum__title-blogs {
    text-align: center;
    margin-bottom: var(--spacing-big);
  }

  .page-lustrum__list {
    grid-column: var(--grid-content-smallest);
  }

  .page-lustrum__facts {
    grid-column: var(--grid-content-narrow);
  }

  .page-lustrum__facts-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--spacing-smaller);
  }
</style>
