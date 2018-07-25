<template>
  <nav class="app-header grid">
    <div class="app-header__content">
      <div class="app-header__home-link">
        <nuxt-link to="/">
          <app-logo/>
          <p class="h4">De Voorhoede</p>
        </nuxt-link>
      </div>
      <div class="app-header__link-lists body-petite">
        <ul class="app-header__link-list">
          <li class="app-header__link"><nuxt-link to="/services/">Services</nuxt-link></li>
          <li class="app-header__link"><nuxt-link to="/cases/">Cases</nuxt-link></li>
          <li class="app-header__link"><nuxt-link to="/academy/">Academy</nuxt-link></li>
          <li class="app-header__link"><nuxt-link to="/about-us/">About us</nuxt-link></li>
          <li class="app-header__link"><nuxt-link to="/contact/">Contact</nuxt-link></li>
        </ul>
        <ul class="app-header__languages-list">
          <li class="app-header__link"><nuxt-link to="/nl/">NL</nuxt-link></li>
          <li class="app-header__link"><nuxt-link to="/en/">EN</nuxt-link></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { AppLogo } from '~/components'

export default {
  components: { AppLogo },
}
</script>

<style>
.app-header {
  border-bottom: 1px solid var(--fog);
  height: 3.125rem; /* 50px */
}

@media screen and (min-width: 1100px) {
  .app-header {
    height: 4.0625rem; /* 75px */
  }
}

.app-header__content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.app-header__home-link a {
  display: flex;
  text-decoration: none;
}

.app-header__home-link svg {
  margin-right: .5625rem; /* 9px */
  width: auto;
  height: calc(1.125rem * 1.1111111111); /* 20px */
}

@media screen and (min-width: 720px) {
  .app-header__home-link svg {
    height: calc(1.625rem * 1.3461538462); /* 35px */
  }
}

.app-header__link-lists {
  display: flex;
  align-items: center;
}

.app-header__link-list {
  display: none;
}

@media screen and (min-width: 720px) {
  .app-header__link-list {
    display: flex;
    align-items: center;
  }
}

.app-header__link {
  padding: 0 calc(2.1875rem / 2); /* 35px / 2 */
  font-family: var(--font-sans);
}

.app-header__link a {
  text-decoration: none;
}

.app-header__link a:hover {
  color: var(--active-blue);
}

.app-header__languages-list {
  display: flex;
  align-items: center;
}

.app-header__languages-list .app-header__link:first-child {
  padding-right: .5rem;
}

.app-header__languages-list .app-header__link + .app-header__link {
  padding-left: 0;
  padding-right: 0;
}

.app-header__languages-list .app-header__link + .app-header__link:before {
  content: '|';
  padding-right: .5rem;
  color: var(--html-blue);
}
</style>
