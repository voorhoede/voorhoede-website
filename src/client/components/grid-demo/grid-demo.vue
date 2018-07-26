<template>
  <div :class="{
    'grid': true,
    'grid-demo':true,
    'grid-demo--show':show
  }">
    <div
      v-for="column in 50"
      :key="column"
      :class="{column: true, [`column-${column}`]: true}"/>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style>
:root {
  --grid-demo-margin: #757575;
  --grid-demo-flex: #e0e0e0;
  --grid-demo-fixed: #616161;
  --grid-demo-center: #e0e0e0;
}

.grid-demo {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: none;
  opacity: 0.5;
}

.grid-demo--show {
  display: grid;
}

.column {
  height: 100vh;
  grid-column: initial;
}

.column:nth-child(1n) { background-color: var(--grid-demo-flex); }
.column:nth-child(2n) { background-color: var(--grid-demo-fixed); }
.column:nth-child(2n+10) { background-color: var(--grid-demo-flex); }
.column:nth-child(2n+9) { background-color: var(--grid-demo-fixed); }
.column:nth-child(9) { background-color: var(--grid-demo-center); }
.column:nth-child(10) { background-color: var(--grid-demo-center); }
.column:nth-child(1) { background-color: var(--grid-demo-margin); }
.column:nth-child(18) { background-color: var(--grid-demo-margin); }
.column:nth-child(1n+19) { display: none; }

@media (min-width: 720px) {
  .column:nth-child(2n+10),
  .column:nth-child(2n+9),
  .column:nth-child(9),
  .column:nth-child(10) { background-color: initial; }
  .column:nth-child(1n+19) { display: initial; }
  .column:nth-child(1n) { background-color: var(--grid-demo-flex); }
  .column:nth-child(2n) { background-color: var(--grid-demo-fixed); }

  .column:nth-child(2n+18) { background-color: var(--grid-demo-flex); }
  .column:nth-child(2n+19) { background-color: var(--grid-demo-fixed); }
  .column:nth-child(17) { background-color: var(--grid-demo-center); }
  .column:nth-child(18) { background-color: var(--grid-demo-center); }
  .column:nth-child(1) { background-color: var(--grid-demo-margin); }
  .column:nth-child(34) { background-color: var(--grid-demo-margin); }
  .column:nth-child(1n+35) { display: none; }
}

@media (min-width: 1200px) {
  .column:nth-child(2n+18),
  .column:nth-child(2n+19),
  .column:nth-child(17),
  .column:nth-child(18) { background-color: initial; }
  .column:nth-child(1n+35) { display: initial; }
  .column:nth-child(1n) { background-color: var(--grid-demo-flex); }
  .column:nth-child(2n) { background-color: var(--grid-demo-fixed); }

  .column:nth-child(2n+26) { background-color: var(--grid-demo-flex); }
  .column:nth-child(2n+27) { background-color: var(--grid-demo-fixed); }
  .column:nth-child(25) { background-color: var(--grid-demo-center); }
  .column:nth-child(26) { background-color: var(--grid-demo-center); }
  .column:nth-child(1) { background-color: var(--grid-demo-margin); }
  .column:nth-child(50) { background-color: var(--grid-demo-margin); }
}

</style>
