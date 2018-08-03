<template>
  <section class="page-cases">
    <div>
      <h1 class="title">{{ $route.params.jobs }}</h1>
    </div>
  </section>
</template>

<script>
export default {
  validate ({ params }) {
    return /^(jobs|vacatures)$/.test(params.jobs)
  },
}
</script>
