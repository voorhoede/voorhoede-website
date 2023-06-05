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
          tabindex="-1"
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
          <app-link
            :to="$localeUrl({ name: 'team-slug', params: { slug: member.slug } })"
            class="team-gallery-member__link"
          >
            <p class="h4">
              {{ member.name }}
            </p>
          </app-link>
          <span
            v-if="member.jobTitle"
            class="body-detail"
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
  .team-gallery__list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 10px;
  }

  .team-gallery-member__link {
    display: block;
    height: auto;
    overflow: hidden;
  }

  .team-gallery-member__link:hover
  .team-gallery-member__image {
    transform: scale(1.05);
  }

  .team-gallery__list-item {
    position: relative;
  }

  .team-gallery-member__image {
    display: block;
    height: 100%;
    object-fit: cover;
    transition: transform 200ms ease-in-out;
  }

  .team-gallery-member__details {
    padding: 1rem 0;
    text-align: center;
  }
</style>
