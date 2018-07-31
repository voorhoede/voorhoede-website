<template>
  <footer class="footer grid">
      <app-footer-list class="footer__list" />
      <div class="footer__logo">logo</div>
      <app-footer-list class="footer__list footer__list--right" />
  </footer>
</template>

<script>
import AppFooterList from '../../components/app-footer-list';

export default {
  components: {
    AppFooterList
  }
}
</script>


<style scoped>
.footer {
  padding: 10px;
  background: var(--brand-yellow);
}

@supports (display: grid) {
  .footer__list {
    grid-column: content-left;
    grid-row: 1;
  }

  .footer__logo {
    grid-column: content;
    display: flex;
    justify-content: center;
    align-items: center;
    grid-row: 1;
  }

  .footer__list--right {
    grid-column: content-right;
    text-align: right;
    grid-row: 1;
  }
}
</style>
