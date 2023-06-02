<template>
  <section class="grid">
    <ul class="team-gallery__list">
      <li v-for="(member, index) in  team " class="team-gallery__list-item">
        <app-link :to="$localeUrl({ name: 'team-slug', params: { slug: member.slug } })" class="">
          <dato-image class="team-gallery-member__image" :class="{" "team-gallery-member__image--idk" : }
            :src="member.image.url" :alt="member.name" :width="member.image.width" :height="member.image.height"
            loading="lazy" sizes="(min-width: 800px) 20vw, (min-width: 500px) 33vw, 50vw" />
          <div class="gallery-item__details">
            <p class="h4">
              {{ member.name }}
            </p>
            <span class="body-detail">{{ member.jobTitle }}</span>
          </div>
        </app-link>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  team: Array<{
    id: string,
    slug: string,
    name: string,
    lastName: string,
    jobTitle: string,
    image: Object,
  }>
}>();
</script>

<style>
:root {
  --gallery-parallax-gap: 10px;
}

.team-gallery__list {
  columns: 3 200px;
}

.team-gallery__list-item {
  /*display: inline-flex;
		height: auto;
		flex-grow: 0;
		flex-shrink: 1;*/
  /* width: calc(50% - var(--gallery-parallax-gap)); */
  height: 26rem;
  margin-bottom: 1rem;
}

.team-gallery__list-item:nth-child(n+4):nth-child(-n+8),
.team-gallery__list-item:nth-child(n+9):nth-child(-n+16) {
  border: 2px solid red;
  height: 20rem;
}

@media (min-width: 500px) {
  .team-gallery__list-item {
    /* width: calc(33% - var(--gallery-parallax-gap)); */
  }
}

.team-gallery-member__image {
  display: block;
  height: 100%;
  object-fit: cover;
}
</style>
