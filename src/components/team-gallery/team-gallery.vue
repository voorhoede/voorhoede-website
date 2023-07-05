<template>
  <section class="grid">
    <ul class="team-gallery__list">
      <li
        v-for="(member, index) in team"
        :key="member.id"
        class="team-gallery__list-item"
      >
        <div class="team-gallery-member__image-wrapper">
          <dato-image
            class="team-gallery-member__image"
            :src="member.image.url"
            :alt="member.name"
            :width="member.image.width"
            :height="member.image.height"
            :quality="75"
            loading="lazy"
            sizes="(min-width: 800px) 20vw, (min-width: 500px) 33vw, 50vw"
          />
        </div>

        <div class="team-gallery-member__details">
          <app-link
            :to="
              $localeUrl({ name: 'team-slug', params: { slug: member.slug } })
            "
            class="team-gallery-member__link"
            @mouseenter="addSquishyNameAnimation(index)"
          >
            <p
              ref="teamGalleryMemberName"
              class="h4 team-gallery-member__name"
            >
              {{ member.name }}
            </p>
          </app-link>
          <span
            v-if="member.jobTitle"
            class="body-detail"
          >
            {{ member.jobTitle }}
          </span>
        </div>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";

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

function addSquishyNameAnimation(index: number) {
  const teamGalleryMemberName = ref<HTMLElement | null>(null);
  teamGalleryMemberName.value = document.querySelectorAll(
    ".team-gallery-member__name"
  )[index] as HTMLElement;

  teamGalleryMemberName.value.classList.add("team-gallery-squishy-animation");

  teamGalleryMemberName.value.addEventListener("animationend", () => {
    teamGalleryMemberName.value?.classList.remove("team-gallery-squishy-animation");
  });
}
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

.team-gallery__list-item {
  position: relative;
}

.team-gallery__list-item:hover
.team-gallery-member__image {
  transform: scale(1.05);
}

.team-gallery__list-item:hover
.team-gallery-member__name {
  animation: squishy-motion 500ms ease-in-out;
}

.team-gallery-squishy-animation {
  animation: squishy-motion 500ms ease-in-out;
}

.team-gallery-member__link::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 100%;
}

.team-gallery-member__image-wrapper {
  overflow: hidden;
  height: auto;
}

@media (min-width: 486px) {
  .team-gallery-member__image-wrapper {
    height: 280px;
  }
}

.team-gallery-member__image {
  display: block;
  height: 100%;
  width: 100%;
  object-fit: cover;
  transition: transform 200ms ease-in-out;
}

.team-gallery-member__details {
  padding: var(--spacing-small);
  text-align: center;
  background-color: var(--white);
}

@media (min-width: 768px) {
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

@keyframes squishy-motion {
  from,
  to {
    transform: scale(1, 1);
  }
  25% {
    transform: scale(0.9, 1.1);
  }
  50% {
    transform: scale(1.1, 0.9);
  }
  75% {
    transform: scale(0.95, 1.05);
  }
}
</style>
