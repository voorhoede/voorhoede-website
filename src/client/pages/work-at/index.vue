<template>
  <main
    id="content"
    class="page-about-us grid"
    tabindex="-1"
  >
    <page-header
      class="page-about-us__header"
      heading="byline"
      :byline="page.title"
      :headline="page.subtitle"
      :image="page.headerIllustration"
    />
    <image-with-text-block
      :title="page.introTitle"
      :body="page.introBody"
      :image="page.introImage"
      class="page-about-us__intro"
    />
    <div class="page-services__contact">
      <p class="pullquote">Ben je er eigenlijk al wel uit? Bel of app met Jennifer, onze recruiter:</p>
      <AppButton
        :aria-label="belle"
        label="Ik bel je op 06 1234 5678"
        to="0031638283028"
      />
      &nbsp;&nbsp;
      <AppButton
        label="Ik mail je op jennifer@voorhoede.nl"
        to="`mailto:jennifer@voorhoede.nl`"
      />
      <p class="pullquote">&nbsp;</p>
    </div>
    <image-with-text-block
      :title="page.middleTitle"
      :body="page.middleBody"
      :image="page.middleImage"
      :inverse="true"
      class="page-about-us__middle"
    />
    <template v-if="jobs.length > 0">
      <div class="page-about-us__jobs-text">
        <h2 class="page-about-us__jobs-title h2">{{ page.jobsTitle }}</h2>
        <p class="body-big font-html-blue">{{ page.jobsBody }}</p>
      </div>
      <ul class="page-about-us__jobs">
        <li class="page-about-us__jobs-list" v-for="item in jobs" :key="item.slug">
          <jobs-excerpt
            class="page-about-us__jobs-list-item"
            :is-nested="true"
            :title="item.title"
            :description="item.description"
            :image="item.jobImage"
            :slug="item.slug"
          />
        </li>
      </ul>
    </template>
    <image-grid
      :title="page.teamGridTitle"
      :items="page.teamGrid"
      class="page-about-us__image-grid"
    />
    <div class="page-services__contact">
      <p class="pullquote">Niet op een van de CTA’s hierboven geklikt? No worries, we houden je in de loop:</p>
    </div>
    <newsletter-form class="page-about-us__newsletter" />
  </main>
</template>

<script>
  import asyncData from '~/lib/async-page'
  import head from '~/lib/seo-head'
  export default {
    asyncData,
    mounted() {
      this.$announcer.set(`${this.$t('page')}: ${this.page.social.title}`, 'polite')
    },
    head,
  }
</script>
