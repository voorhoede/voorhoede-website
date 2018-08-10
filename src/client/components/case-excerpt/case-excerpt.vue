<template>
  <article
    class="case-excerpt"
    :class="{ 'case-excerpt--open': toolTipIsOpen }"
    :id="`case-excerpt-${caseId}`"
  >
    <a
      @click.prevent="toggleTooltip"
      :href="`#case-excerpt-${caseId}`"
      role="button"
      class="case-excerpt__image-container"
    >
      <img :src="`/images/${imageName}.svg`" class="case-excerpt__image">
    </a>
    <div
      class="case-excerpt__tooltip"
      :class="{
        'case-exceprt__tooltip--right' : alignTooltip === 'right',
        'case-exceprt__tooltip--left' : alignTooltip === 'left',
        'case-exceprt__tooltip--show' : tooltipIsOpen
      }"
    >
      <div class="case-exceprt__tooltip-triangle" />
      <div class="case-exceprt__description">
        <h3 class="h3 case-excepert__description-header">
          {{ caseDescriptionHeader }}
        </h3>
        <p class="body">
          {{ caseDescriptionBody }}
        </p>
      </div>
      <div class="case-exceprt__tooltip-actions">
        <app-button
          :label="primaryLabel"
          :to="primaryHref"
        />
        <app-button
          secondary
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
    primaryLabel: {
      type: String,
      required: false,
      default: '',
    },
    primaryHref: {
      type: String,
      required: false,
      default: '',
    },
    secondaryLabel: {
      type: String,
      required: false,
      default: '',
    },
    secondaryHref: {
      type: String,
      required: false,
      default: '',
    },
    alignTooltip: {
      type: String,
      required: false,
      default: '',
    },
    imageName: {
      type: String,
      required: true,
      default: '',
    },
    caseDescriptionHeader: {
      type: String,
      required: true,
    },
    caseDescriptionBody: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      tooltipIsOpen: false,
    }
  },
  methods: {
    toggleTooltip() {
      this.tooltipIsOpen = !this.tooltipIsOpen
    },
  },
}
</script>

<style>
:root {
  --triangle-size: 30px;
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
  transition: 200ms transform ease-in-out;
}

.case-excerpt__image {
  width: 100%;
  max-height: 230px;
}

.case-excerpt__tooltip {
  display: none;
  flex-direction: column;
  position: absolute;
  top: calc(66% + var(--triangle-size));
  left: calc(var(--spacing-medium) * -1);
  right: calc(var(--spacing-medium) * -1);
  width: auto;
  background: var(--brand-yellow);
  padding: var(--spacing-medium);
}

.case-exceprt__tooltip--show {
  display: flex;
}

.case-exceprt__tooltip-triangle {
  position: absolute;
  top: calc(var(--triangle-size) - 59px);
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  width: 0;
  height: 0;
	border-left: var(--triangle-size) solid transparent;
	border-right: var(--triangle-size) solid transparent;
	border-bottom: var(--triangle-size) solid var(--brand-yellow);
}

.case-exceprt__tooltip-actions {
  display: flex;
  align-items: center;
}

.case-exceprt__tooltip-actions .app-button {
  min-width: auto;
  width: calc(50% - (var(--spacing-smaller) / 2));
}

.case-exceprt__tooltip-actions .app-button:first-of-type {
  margin-right: var(--spacing-small);
}

.case-exceprt__description {
  color: var(--html-blue);
  margin-bottom: var(--spacing-small);
}

.case-excepert__description-header {
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
    top: calc(50% + var(--triangle-size));
    width: 100%;
    max-width: 310px;
  }

  .case-exceprt__tooltip--right {
    right: 33%;
  }

  .case-exceprt__tooltip--right > .case-exceprt__tooltip-triangle {
    right: var(--spacing-medium);
    margin-right: 0;
  }

  .case-exceprt__tooltip--left {
    left: 33%;
  }

  .case-exceprt__tooltip--left > .case-exceprt__tooltip-triangle {
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
