<template>
  <nav class="app-header">
    <ul class="app-header__link-list">
      <li class="app-header__link"><nuxt-link to="/">Home</nuxt-link></li>
      <li class="app-header__link"><nuxt-link to="/about-us/">About us</nuxt-link></li>
    </ul>
  </nav>
</template>

<style>
.app-header__link-list {
  display: flex;
  justify-content: flex-end;
}

.app-header__link {
  padding: .5em;
}
</style>
