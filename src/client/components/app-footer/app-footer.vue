<template>
  <footer class="footer grid">
    <app-footer-list class="footer__list-wrapper" />
    <div class="footer__logo">
      <h2 class="h1">Make it real</h2>
      <app-logo />
      <p class="body">Discuss your next project with us</p>
    </div>
    <app-footer-list class="footer__list-wrapper footer__list-wrapper--right" />
    <div class="footer footer__row">
      <span class="footer-businessinfo">KvK: 56017235. BTW: NL851944620B01. IBAN: NL20ABNA0442829159</span>
      <ul class="footer-icon__list">
        <li class="footer-icon__list-item">
          facebook
        </li>
        <li class="footer-icon__list-item">
          instagram
        </li>
        <li class="footer-icon__list-item">
          twitter
        </li>
        <li class="footer-icon__list-item">
          github
        </li>
      </ul>
      <span class="footer-copyright">@ De Voorhoede 2018  Privacy statement</span>
    </div>
  </footer>
</template>

<script>
import AppFooterList from '../../components/app-footer-list'
import AppLogo from '../../components/app-logo'

export default {
  components: {
    AppFooterList,
    AppLogo,
  },
}
</script>


<style scoped>
.footer {
  padding: 10px 0;
  background: var(--brand-yellow);
}

.footer__row {
  display: flex;
  flex-direction: column;
}

.footer__row .footer-businessinfo {
  display: none;
}

.footer-copyright {
  text-align: center;
}

.footer-icon__list {
  display: flex;
  text-align: center;
  justify-content: space-around;
  margin-bottom: 15px;
}

@supports (display: grid) {
  .footer__list-wrapper {
    text-align: center;
    grid-row: 2;
    margin-bottom: 20px;
  }

  .footer__list-wrapper.footer__list-wrapper--right {
    grid-row: 3;
    text-align: center;
  }

  .footer__logo {
    grid-row: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;
  }

  .footer__logo .h1 {
    margin-bottom: 15px;
  }

  .footer__logo .body {
    color: var(--html-blue);
    margin-bottom: 40px;
  }

  .footer__logo svg {
    width: 3.25rem;
    height: 3.25rem;
    margin-bottom: 15px;
  }

  @media (min-width: 720px) {
     .footer__logo .body {
       margin-bottom: 0;
     }

    .footer__row {
      border-top: 1px solid var(--black);
      flex-direction: row;
    }

    .footer__row .footer-businessinfo {
      display: flex;
    }

    .footer__list-wrapper {
      grid-column: content-left;
      text-align: left;
      grid-row: 1;
    }
    .footer__list-wrapper.footer__list-wrapper--right {
      grid-column: content-right;
      text-align: right;
      grid-row: 1;
    }
  }
}

</style>
