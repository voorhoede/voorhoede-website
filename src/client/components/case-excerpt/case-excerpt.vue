<template>
  <article
    class="case-excerpt"
    :class="{ 'case-excerpt--open': isTooltipOpen }"
    :id="`case-excerpt-${caseId}`"
  >
    <a
      @click.prevent="toggleTooltip"
      :href="`#case-excerpt-${caseId}`"
      role="button"
      class="case-excerpt__image-container"
    >
      <fixed-ratio :width="10" :height="9">
        <lazy-load>
          <img :src="imageUrl" class="case-excerpt__image">
        </lazy-load>
      </fixed-ratio>
    </a>
    <div
      class="case-excerpt__tooltip"
      :class="{
        'case-excerpt__tooltip--right' : alignTooltip === 'right',
        'case-excerpt__tooltip--left' : alignTooltip === 'left',
      }"
    >
      <div class="case-excerpt__description">
        <h3 class="h3 case-excerpt__title">
          {{ title }}
        </h3>
        <p class="body">
          {{ body }}
        </p>
      </div>
      <div class="button-group">
        <app-button
          @focus="isTooltipOpen = true"
          :label="primaryLabel"
          :to="{ name: 'locale-cases-slug', params: { slug, locale: 'en' }}"
        />
        <app-button
          secondary
          v-if="secondaryLabel"
          @blur="isTooltipOpen = false"
          @focus="isTooltipOpen = true"
          :label="secondaryLabel"
          :to="{ name: 'locale-cases', params: { locale: 'en' }}"
        />
      </div>
    </div>
  </article>
</template>

<script>
import { AppButton, FixedRatio, LazyLoad } from '~/components'

export default {
  components: {
    AppButton,
    FixedRatio,
    LazyLoad,
  },
  props: {
    caseId: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    primaryLabel: {
      type: String,
      default: '',
    },
    slug: {
      type: String,
      default: '',
    },
    secondaryLabel: {
      type: String,
      default: '',
    },
    alignTooltip: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isTooltipOpen: false,
    }
  },
  methods: {
    toggleTooltip() {
      this.isTooltipOpen = !this.isTooltipOpen
    },
  },
}
</script>

<style>
:root {
  --case-excerpt-triangle-size: 20px;
}

.case-excerpt {
  display: flex;
  position: relative;
  justify-content: center;
}

.case-excerpt__image-container {
  width: 100%;
  background: var(--white);
  border: 3px solid var(--html-blue);
  transform-origin: center;
  transition: 200ms transform cubic-bezier(.05, 0, .45, 1);
}

.case-excerpt__image {
  position: absolute;
  left: 0;
  top: 40%; /* Image should be aligned a bit above the center */
  transform: translateY(-50%);
  width: 100%;
}

.case-excerpt__tooltip {
  flex-direction: column;
  position: absolute;
  top: calc(66% + var(--case-excerpt-triangle-size));
  left: calc(var(--spacing-medium) * -1);
  right: calc(var(--spacing-medium) * -1);
  width: auto;
  background: var(--brand-yellow);
  padding: var(--spacing-medium);
  z-index: 1;
  transform-origin: top;
  transform: scaleY(0);
  transition: transform 200ms cubic-bezier(0, 0, .1, 1) .11s;
}

.case-excerpt__tooltip::before {
  content: '';
  position: absolute;
  top: calc(var(--case-excerpt-triangle-size) * -1);
  left: 0;
  right: 0;
  width: 0;
  margin-left: auto;
  margin-right: auto;
	border-left: var(--case-excerpt-triangle-size) solid transparent;
	border-right: var(--case-excerpt-triangle-size) solid transparent;
  border-bottom: var(--case-excerpt-triangle-size) solid var(--brand-yellow);
  transform: none;
}

.case-excerpt__title {
  margin-bottom: var(--spacing-smaller);
}

.case-excerpt__description {
  color: var(--html-blue);
  margin-bottom: var(--spacing-small);
}

.case-excerpt:target .case-excerpt__image-container,
.case-excerpt--open .case-excerpt__image-container {
  border-width: 5px;
  margin: -2px; /* Decrease the margin-bottom, to prevent jump caused by enlarged border */
  transform: scale(1.05);
}

.case-excerpt:target .case-excerpt__tooltip,
.case-excerpt--open .case-excerpt__tooltip {
  display: flex;
  transform: scaleY(1);
}

@media (min-width: 480px) {
  .case-excerpt__image-container:focus,
  .case-excerpt:hover .case-excerpt__image-container,
  .case-excerpt--open .case-excerpt__image-container {
    border-width: 5px;
    margin: -2px; /* Decrease the margin-bottom, to prevent jump caused by enlarged border */
    transform: scale(1.05);
  }

  .case-excerpt:hover .case-excerpt__tooltip,
  .case-excerpt__image-container:focus + .case-excerpt__tooltip {
    display: flex;
    transform: scaleY(1);
  }

  .case-excerpt__tooltip {
    left: auto;
    right: auto;
    top: calc(50% + var(--case-excerpt-triangle-size));
    width: 100%;
    min-width: 360px;
  }

  .case-excerpt__tooltip--left {
    left: 33%;
  }

  .case-excerpt__tooltip--left::before {
    left: var(--spacing-medium);
    margin-left: 0;
  }

  .case-excerpt__tooltip--right {
    right: 33%;
  }

  .case-excerpt__tooltip--right::before {
    right: var(--spacing-medium);
    margin-right: 0;
  }
}

@media (min-width: 1100px) {
  .case-excerpt__tooltip {
    max-width: 360px;
  }
}
</style>
