<template>
  <section class="grid">
    <ul class="team-gallery__list">
      <li
        v-for="member in team "
        :key="member.id"
        class="team-gallery__list-item"
      >
        <app-link
          :to="$localeUrl({ name: 'team-slug', params: { slug: member.slug } })"
          class="team-gallery-member__link"
        >
          <dato-image
            class="team-gallery-member__image"
            :src="member.image.url"
            :alt="member.name"
            :width="member.image.width"
            :height="member.image.height"
            loading="lazy"
            sizes="(min-width: 800px) 20vw, (min-width: 500px) 33vw, 50vw"
          />
        </app-link>
        <div class="team-gallery-member__details">
          <p class="h4 team-gallery-member__name">
            {{ member.name }}
          </p>
          <span
            v-if="member.jobTitle"
            class="body-detail team-gallery-member__job"
          >{{ member.jobTitle }}</span>
        </div>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  team: Array<{
    id: string,
    slug: string,
    name: string,
    lastName: string,
    jobTitle: string,
    image: {
      url: string,
      width: number,
      height: number,
    },
  }>
}>();
</script>

<style>
:root {
  --gallery-parallax-gap: 10px;
  --team-gallery-grid-columns: 1;
}

.team-gallery__list {
  display: grid;
  grid-template-columns: repeat(var(--team-gallery-grid-columns), 1fr);
  /* grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); */
  gap: 10px;
}

.team-gallery-member__link {
  display: block;
  height: auto;
}

.team-gallery__list-item {
  /* text-align: center; */
  position: relative;
}

@media (min-width: 486px) {
  :root {
    --team-gallery-grid-columns: 2;
  }

  .team-gallery__list {
    grid-template-columns: repeat(var(--team-gallery-grid-columns), 1fr);
  }
  .team-gallery__list-item:nth-child(2n+2){
    transform: translateY(20px);
  }
}

@media (min-width: 768px) {
  :root {
    --team-gallery-grid-columns: 3;
  }

  .team-gallery__list .team-gallery__list-item:nth-child(2n+2){
    transform: translateY(0px);
  }

  .team-gallery__list .team-gallery__list-item:nth-child(3n+2) {
    transform: translateY(50px);
  }
}

@media (min-width: 1020px) {
  :root {
    --team-gallery-grid-columns: 4;
  }

  .team-gallery__list .team-gallery__list-item:nth-child(2n+2){
    transform: translateY(0px);
  }

  .team-gallery__list .team-gallery__list-item:nth-child(3n+2) {
    transform: translateY(0px);
  }

  .team-gallery__list .team-gallery__list-item:nth-child(4n+2),
  .team-gallery__list .team-gallery__list-item:nth-child(4n+4) {
    transform: translateY(50px);
  }
}

@media (min-width: 1200px) {
  :root {
    --team-gallery-grid-columns: 6;
  }
}

.team-gallery-member__image {
  display: block;
  height: 100%;
  object-fit: cover;
}

.team-gallery-member__details {
  position: absolute;
  background-color: var(--brand-yellow);
  z-index: 1;
  bottom: 0;
  right: 0;
  padding: 10px;
}

.team-gallery-member__name {
  /* background-color: var(--brand-yellow); */
  padding-top: 10px;
}

.team-gallery-member__job {
  display: block;
  /* color: var(--white); */
}
</style>
