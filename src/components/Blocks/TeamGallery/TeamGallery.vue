<template>
  <section class="grid">
    <ul class="team-gallery__list">
      <li
        v-for="(member, index) in data.persons"
        :key="member.id"
        class="team-gallery__list-item"
      >
        <div class="team-gallery-member__image-wrapper">
          <DatoImage
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
          <AppLink
            :to="
              $localeUrl({ name: 'team-slug', params: { slug: member.slug } })
            "
            class="team-gallery-member__link"
            @mouseenter="addSquishyNameAnimation(index)"
          >
            <p
              :ref="(el) => setTeamGalleryMemberNameRef(el, index)"
              class="h4 team-gallery-member__name"
            >
              {{ member.name }}
            </p>
          </AppLink>
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
import { type TeamGalleryFragment } from "./TeamGallery.query";
import { type FragmentOf, readFragment } from "~/utils/graphql";
import DatoImage from "~/components/dato-image/dato-image.vue";
import AppLink from "~/components/app-link/app-link.vue";

const props = defineProps<{
  data: FragmentOf<typeof TeamGalleryFragment>;
}>();

const data = readFragment<typeof TeamGalleryFragment>(props.data);

const teamGalleryMemberNameRefs = ref<Record<number, HTMLElement | null>>({});

function setTeamGalleryMemberNameRef(el: HTMLElement | null, index: number) {
  teamGalleryMemberNameRefs.value[index] = el;
}

function addSquishyNameAnimation(index: number) {
  const el = teamGalleryMemberNameRefs.value[index];
  if (!el) return;

  el.classList.add("team-gallery-squishy-animation");

  el.addEventListener("animationend", () => {
    el?.classList.remove("team-gallery-squishy-animation");
  }, { once: true });
}
</script>

<style scoped>
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
