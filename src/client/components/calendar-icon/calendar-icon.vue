<template>
  <time
    class="calendar-icon"
    :datetime="date"
  >
    <span class="calendar-icon__day font-bold">{{ day }}</span>
    <span class="calendar-icon__month">{{ month }}</span>
  </time>
</template>

<script>
export default {
  props: {
    date: {
      type: String,
      required: true,
    },
  },
  computed: {
    dateObject () {
      return new Date(this.date)
    },
    day () {
      return this.dateObject.getDate()
    },
    month () {
      // Intl.DateTimeFormat doesn't work server-side, and throws off design,
      // therefore only use English here.
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
      return months[this.dateObject.getMonth()]
    },
  },
}
</script>

<style>
  .calendar-icon {
    display: block;
    position: relative;
    width: 3.75rem;
    padding: var(--spacing-tiny) 0;
    border: 3px solid var(--html-blue);
    font-family: var(--font-sans);
    text-align: center;
    color: var(--html-blue);
    grid-column-start: 2;
    grid-column-end: 13;
    align-self: start;
    justify-self: end;
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
