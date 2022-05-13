<template>
  <article>
    <header>
      <h2 class="h2">Fallback typography</h2>
      <label>
        <input
          v-model="webfont"
          type="checkbox"> Webfont
      </label>
      <label>
        <input
          v-model="fallbackfont"
          type="checkbox"> fallback font
      </label>
      <button @click="toggle">&nbsp;toggle&nbsp;</button>
    </header>

    <section class="content">
      <div
        v-if="webfont"
        class="fonts-loaded apercu-font">
        <p class="body-big spacing">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia ut suscipit vero aliquam dolore, voluptatibus molestias, quis praesentium aspernatur ullam corporis vitae labore earum esse voluptate sequi perspiciatis? Amet, neque? Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt similique numquam, molestiae, facilis blanditiis ducimus impedit repellat, veritatis fugit ratione delectus obcaecati minus? Commodi, quod? Quis veritatis facere amet doloremque!</p>
        <p class="body spacing">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia ut suscipit vero aliquam dolore, voluptatibus molestias, quis praesentium aspernatur ullam corporis vitae labore earum esse voluptate sequi perspiciatis? Amet, neque? Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt similique numquam, molestiae, facilis blanditiis ducimus impedit repellat, veritatis fugit ratione delectus obcaecati minus? Commodi, quod? Quis veritatis facere amet doloremque!</p>
        <p class="body-small spacing">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia ut suscipit vero aliquam dolore, voluptatibus molestias, quis praesentium aspernatur ullam corporis vitae labore earum esse voluptate sequi perspiciatis? Amet, neque? Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt similique numquam, molestiae, facilis blanditiis ducimus impedit repellat, veritatis fugit ratione delectus obcaecati minus? Commodi, quod? Quis veritatis facere amet doloremque!</p>
        <p class="body-detail spacing">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia ut suscipit vero aliquam dolore, voluptatibus molestias, quis praesentium aspernatur ullam corporis vitae labore earum esse voluptate sequi perspiciatis? Amet, neque? Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt similique numquam, molestiae, facilis blanditiis ducimus impedit repellat, veritatis fugit ratione delectus obcaecati minus? Commodi, quod? Quis veritatis facere amet doloremque!</p>
      </div>
      <div
        v-if="fallbackfont"
        class="fallback-font">
        <p class="body-big spacing">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia ut suscipit vero aliquam dolore, voluptatibus molestias, quis praesentium aspernatur ullam corporis vitae labore earum esse voluptate sequi perspiciatis? Amet, neque? Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt similique numquam, molestiae, facilis blanditiis ducimus impedit repellat, veritatis fugit ratione delectus obcaecati minus? Commodi, quod? Quis veritatis facere amet doloremque!</p>
        <p class="body spacing">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia ut suscipit vero aliquam dolore, voluptatibus molestias, quis praesentium aspernatur ullam corporis vitae labore earum esse voluptate sequi perspiciatis? Amet, neque? Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt similique numquam, molestiae, facilis blanditiis ducimus impedit repellat, veritatis fugit ratione delectus obcaecati minus? Commodi, quod? Quis veritatis facere amet doloremque!</p>
        <p class="body-small spacing">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia ut suscipit vero aliquam dolore, voluptatibus molestias, quis praesentium aspernatur ullam corporis vitae labore earum esse voluptate sequi perspiciatis? Amet, neque? Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt similique numquam, molestiae, facilis blanditiis ducimus impedit repellat, veritatis fugit ratione delectus obcaecati minus? Commodi, quod? Quis veritatis facere amet doloremque!</p>
        <p class="body-detail spacing">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia ut suscipit vero aliquam dolore, voluptatibus molestias, quis praesentium aspernatur ullam corporis vitae labore earum esse voluptate sequi perspiciatis? Amet, neque? Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt similique numquam, molestiae, facilis blanditiis ducimus impedit repellat, veritatis fugit ratione delectus obcaecati minus? Commodi, quod? Quis veritatis facere amet doloremque!</p>
      </div>
    </section>
  </article>
</template>

<script>
export default {
  data: () => ({ webfont: true, fallbackfont: true }),
  mounted() {
    document.documentElement.classList.remove('fonts-loaded')
  },
  destroyed() {
    document.documentElement.classList.add('fonts-loaded')
  },
  methods: {
    toggle() {
      if (this.webfont === this.fallbackfont) {
        this.webfont = !this.webfont
      } else {
        this.webfont = !this.webfont
        this.fallbackfont = !this.fallbackfont
      }
    },
  },
}
</script>

<style>
.content {
  position: relative;
}

.spacing {
  margin-bottom: 1rem !important;
}

.fallback-font {
  position: absolute;
  top: 0;
  left: 0;
}

.fallback-font p {
  font-family: sans-serif !important;
}

.apercu-font {
  position: absolute;
}
</style>
