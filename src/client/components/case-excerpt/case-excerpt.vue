<template>
  <article
    class="case-excerpt"
    :class="{ 'case-excerpt--open': isTooltipOpen }"
    :id="`case-excerpt-${caseId}`"
    @mouseover="isTooltipOpen = true"
    @mouseleave="isTooltipOpen = false"
  >
    <nuxt-link
      @click.prevent="toggleTooltip"
      :to="`#case-excerpt-${caseId}`"
      role="button"
      class="case-excerpt__image-container"
    >
      <img :src="`/images/${imageName}.svg`" class="case-excerpt__image">
    </nuxt-link>
    <div
      class="case-excerpt__tooltip"
      :class="{
        'case-excerpt__tooltip--right' : alignTooltip === 'right',
        'case-excerpt__tooltip--left' : alignTooltip === 'left',
      }"
    >
      <div class="case-excerpt__description">
        <h3 class="h3 case-excerpt__description-header">
          {{ caseDescriptionHeader }}
        </h3>
        <p class="body">
          {{ caseDescriptionBody }}
        </p>
      </div>
      <div class="button-group">
        <app-button
          @focus="isTooltipOpen = true"
          :label="primaryLabel"
          :to="primaryHref"
        />
        <app-button
          secondary
          @blur="isTooltipOpen = false"
          @focus="isTooltipOpen = true"
          :label="secondaryLabel"
          :to="secondaryHref"
        />
      </div>
    </div>
  </article>
</template>

<script>
import { AppButton } from '~/components'

export default {
  components: {
    AppButton,
  },
  props: {
    caseId: {
      type: String,
      required: true,
    },
    imageName: {
      type: String,
      required: true,
    },
    caseDescriptionHeader: {
      type: String,
      required: true,
    },
    caseDescriptionBody: {
      type: String,
      required: true,
    },
    primaryLabel: {
      type: String,
      default: '',
    },
    primaryHref: {
      type: String,
      default: '',
    },
    secondaryLabel: {
      type: String,
      default: '',
    },
    secondaryHref: {
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
  padding-bottom: var(--spacing-larger);
  background: var(--white);
  border: 3px solid var(--html-blue);
  transform-origin: center;
  transition: 200ms transform cubic-bezier(.05, 0, .45, 1);
}

.case-excerpt__image {
  width: 100%;
  max-height: 230px;
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
  margin-left: auto;
  margin-right: auto;
  width: 0;
  height: 0;
	border-left: var(--case-excerpt-triangle-size) solid transparent;
	border-right: var(--case-excerpt-triangle-size) solid transparent;
  border-bottom: var(--case-excerpt-triangle-size) solid var(--brand-yellow);
  transform: none;
}

.case-excerpt__description {
  color: var(--html-blue);
  margin-bottom: var(--spacing-small);
}

.case-excerpt__description-header {
  margin-bottom: var(--spacing-smaller);
}

.case-excerpt:target .case-excerpt__image-container,
.case-excerpt--open .case-excerpt__image-container {
  border: 5px solid var(--html-blue);
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
    border: 5px solid var(--html-blue);
    transform: scale(1.05);
  }

  .case-excerpt:hover .case-excerpt__tooltip,
  .case-excerpt__image-container:focus + .case-excerpt__tooltip {
    display: flex;
    transform: scaleY(1);
  }

  .case-excerpt__image-container {
    padding-bottom: var(--spacing-big);
  }

  .case-excerpt__image {
    max-height: 275px;
  }

  .case-excerpt__tooltip {
    left: auto;
    right: auto;
    top: calc(50% + var(--case-excerpt-triangle-size));
    width: 100%;
    max-width: 320px;
  }

  .case-excerpt__tooltip--right {
    right: 33%;
  }

  .case-excerpt__tooltip--right::before {
    right: var(--spacing-medium);
    margin-right: 0;
  }

  .case-excerpt__tooltip--left {
    left: 33%;
  }

  .case-excerpt__tooltip--left::before {
    left: var(--spacing-medium);
    margin-left: 0;
  }
}

@media (min-width: 1100px) {
  .case-excerpt__image-container {
    padding-bottom: var(--spacing-huge);
  }

  .case-excerpt__image {
    max-height: 380px;
  }

  .case-excerpt__tooltip {
    max-width: 360px;
  }
}
</style>
