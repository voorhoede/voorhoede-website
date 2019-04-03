<template>
  <time
    class="calendar-icon"
    :class="{
      'calendar-icon--blue': (fill === 'blue'),
      'calendar-icon--yellow': (fill === 'yellow'),
      'calendar-icon--dim': (fill === 'dim'),
    }"
    :datetime="date"
    :aria-label="`${ day } ${ month }`"
  >
    <span aria-hidden="true" class="calendar-icon__day font-bold">{{ day }}</span>
    <span aria-hidden="true" class="calendar-icon__month">{{ month }}</span>
  </time>
</template>

<script>
import formatDate from '../../lib/format-date'

export default {
  props: {
    date: {
      type: String,
      required: true,
    },
    fill: {
      type: String,
      default: 'none',
      validator: color => ['blue', 'yellow', 'dim', 'none'].indexOf(color) !== -1,
    },
    solid: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    dateObject () {
      return new Date(this.date)
    },
    day () {
      return this.dateObject.getDate()
    },
    month () {
      return formatDate({
        date: this.dateObject,
        locale: this.$i18n.locale,
        format: 'MMM'
      })
    },
  },
}
</script>

<style>
  .calendar-icon {
    display: block;
    position: relative;
    width: 3.75rem;
    max-height: 3.75rem;
    padding: var(--spacing-tiny) 0;
    font-family: var(--font-sans);
    text-align: center;
    border: 3px solid var(--html-blue);
    color: var(--html-blue);
  }

  .calendar-icon::before,
  .calendar-icon::after {
    content: '';
    position: absolute;
    top: -60px;
    width: 2px;
    height: 64px;
    border-radius: 1px;
    background-color: var(--html-blue);
  }

  .calendar-icon::before {
    left: 8px;
  }

  .calendar-icon::after {
    right: 8px;
  }

  .calendar-icon--blue {
    background-color: var(--html-blue);
    border: none;
    color: var(--white);
  }

  .calendar-icon--dim {
    background-color: var(--dim);
    border: none;
    color: var(--white);
  }

  .calendar-icon--dim::before,
  .calendar-icon--dim::after {
    background-color: var(--dim);
  }

  .calendar-icon--yellow {
    background-color: var(--brand-yellow);
    border: none;
  }

  .calendar-icon--yellow::before,
  .calendar-icon--yellow::after {
    background-color: var(--brand-yellow);
  }

  .calendar-icon__day,
  .calendar-icon__month {
    display: block;
    text-align: center;
  }

  .calendar-icon__day {
    font-size: 1.8125rem;
  }

  .calendar-icon__month {
    font-size: .8125rem;
    letter-spacing: 2.3px;
    text-transform: uppercase;
  }

</style>
