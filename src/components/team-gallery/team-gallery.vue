<template>
  <section class="grid">
    <ul class="team-gallery__list">
      <li
        v-for="member in team"
        :key="member.id"
        class="team-gallery__list-item"
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
        <div class="team-gallery-member__details">
          <app-link
            :to="
              $localeUrl({ name: 'team-slug', params: { slug: member.slug } })
            "
            class="team-gallery-member__link"
          >
            <p class="h4">
              {{ member.name }}
            </p>
          </app-link>
          <span
            v-if="member.jobTitle"
            class="body-detail team-gallery-member__job-title"
          >
            {{ member.jobTitle }}
          </span>
        </div>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  team: Array<{
    id: string;
    slug: string;
    name: string;
    lastName: string;
    jobTitle: string;
    image: {
      url: string;
      width: number;
      height: number;
    };
  }>;
}>();
</script>

<style>
:root {
  --team-gallery-grid-columns: 1;
}

.team-gallery__list {
  display: grid;
  grid-template-columns: repeat(var(--team-gallery-grid-columns), 1fr);
  gap: var(--spacing-small);
}

.team-gallery-member__link {
  display: block;
  overflow: hidden;
  padding-left: 1rem;
  padding-top: 1rem;
  background-color: var(--brand-yellow);
}

.team-gallery__list-item:hover .team-gallery-member__image {
  transform: scale(1.05);
}

.team-gallery__list-item {
  position: relative;
  overflow: hidden;
}

.team-gallery-member__link::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 100%;
}

.team-gallery-member__image {
  display: block;
  height: 100%;
  object-fit: cover;
  transition: transform 200ms ease-in-out;
}

.team-gallery-member__details {
  display: flex;
  position: absolute;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
  width: 100%;
  bottom: 0;
  z-index: 1;
}

.team-gallery-member__details:not(:has(span))
.team-gallery-member__link {
  padding-bottom: var(--spacing-small);
}

@media (min-width: 768px) {
  .team-gallery-member__details {
    opacity: 0;
    transition: opacity 200ms ease-in-out;
  }

  .team-gallery__list-item:hover .team-gallery-member__details {
    opacity: 1;
  }

  .team-gallery__list-item:focus-within .team-gallery-member__details {
    opacity: 1;
  }

  .team-gallery__list-item:focus-within .team-gallery-member__image {
    transform: scale(1.05);
  }
}

@media (min-width: 486px) {
  :root {
    --team-gallery-grid-columns: 2;
  }

  .team-gallery__list {
    grid-template-columns: repeat(var(--team-gallery-grid-columns), 1fr);
  }

  .team-gallery__list-item:nth-child(2n + 2) {
    transform: translateY(20px);
  }
}

@media (min-width: 768px) {
  :root {
    --team-gallery-grid-columns: 3;
  }

  .team-gallery__list .team-gallery__list-item:nth-child(2n + 2) {
    transform: translateY(0px);
  }

  .team-gallery__list .team-gallery__list-item:nth-child(3n + 2) {
    transform: translateY(50px);
  }
}

@media (min-width: 1020px) {
  :root {
    --team-gallery-grid-columns: 4;
  }

  .team-gallery__list .team-gallery__list-item:nth-child(2n + 2) {
    transform: translateY(0px);
  }

  .team-gallery__list .team-gallery__list-item:nth-child(3n + 2) {
    transform: translateY(0px);
  }

  .team-gallery__list .team-gallery__list-item:nth-child(4n + 2),
  .team-gallery__list .team-gallery__list-item:nth-child(4n + 4) {
    transform: translateY(50px);
  }
}

@media (min-width: 1200px) {
  :root {
    --team-gallery-grid-columns: 6;
  }
}

.team-gallery-member__job-title {
  padding-left: var(--spacing-small);
  padding-top: var(---spacing-small);
  padding-bottom: var(--spacing-small);
  background-color: var(--brand-yellow);
}
</style>
