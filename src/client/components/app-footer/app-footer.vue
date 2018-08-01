<template>
  <footer class="footer grid">
    <app-footer-list class="footer__wrapper" />
    <div class="footer__header">
      <h2 class="h3 footer__header-title">{{ headerTitle }}</h2>
      <img class="footer__header-logo" src="/images/logo--blue.svg">
      <p class="body">{{ headerSubtitle }}</p>
    </div>
    <div class="footer__wrapper footer__wrapper--right">
      <h5 class="body footer-contact__header">Contact</h5>
      <div class="body-detail footer-contact__link-list">
        <nuxt-link target="_blank" :to="`tel:${tel}`">{{ tel }}</nuxt-link>
        <nuxt-link target="_blank" :to="`mailto:${email}`">{{ email }}</nuxt-link>
        <nuxt-link
          target="_blank"
          :to="`${addressLink}`"
          class="footer-contact__link-address">
          <span>{{ address }}</span>
          <span>{{ postalCode }}</span>
        </nuxt-link>
      </div>
    </div>
    <div class="footer__bottom">
      <div class="body-detail footer__bottom-text">
        <span>KvK: {{ kvk }}</span>
        <span>BTW: {{ btw }}</span>
        <span>IBAN: {{ iban }}</span>
      </div>
      <ul class="footer-icon__list">
        <li class="footer-icon__list-item">
          <nuxt-link to="https://www.instagram.com/devoorhoede/?hl=nl" target="_blank">
            <app-icon name="instagram--blue" />
          </nuxt-link>
        </li>
        <li class="footer-icon__list-item">
          <nuxt-link to="https://twitter.com/devoorhoede" target="_blank">
            <app-icon name="twitter--blue" />
          </nuxt-link>
        </li>
        <li class="footer-icon__list-item">
          <nuxt-link to="https://www.facebook.com/DeVoorhoede/" target="_blank">
            <app-icon name="facebook--blue" />
          </nuxt-link>
        </li>
        <li class="footer-icon__list-item">
          <nuxt-link to="https://github.com/voorhoede/" target="_blank">
            <app-icon name="git-hub--blue" />
          </nuxt-link>
        </li>
      </ul>
      <span class="body-detail footer-copyright">{{ copyright }}</span>
    </div>
  </footer>
</template>

<script>
import AppFooterList from '../../components/app-footer-list'
import AppIcon from '../../components/app-icon'

export default {
  components: {
    AppFooterList,
    AppIcon,
  },
  data: () => {
    return {
      headerTitle: 'Make it real',
      headerSubtitle: 'Discuss your next project with us',
      tel: '+31 (0)20 2610 954',
      email: 'post@voorhoede.nl',
      addressLink: 'https://www.google.nl/maps/place/De+Voorhoede+%7C+Front-end+Development/@52.3477995,4.8485761,17z/data=!3m1!4b1!4m5!3m4!1s0x47c5e21d502d2d59:0xbf570944a96ebf45!8m2!3d52.3477962!4d4.8507648',
      address: 'Rijnsburgstraat 9 - 11',
      postalCode: '1059 AT Amsterdam',
      copyright: '@ De Voorhoede 2018  Privacy statement',
      kvk: '56017235',
      btw: 'NL851944620B01',
      iban: 'NL20ABNA0442829159',
    }
  },
}
</script>

<style>
.footer {
  padding: var(--spacing-large) 0 0 0;
  background: var(--brand-yellow);
}

.footer__bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: calc(var(--spacing-smaller) * 2);
  padding-top: calc(var(--spacing-smaller) * 2);
  border-top: 1px solid var(--black);
}

.footer__bottom .footer__bottom-text {
  display: none;
}

.footer-copyright {
  text-align: center;
}

.footer-contact__header {
  font-weight: 700;
  color: var(--html-blue);
  text-align: center;
  margin-bottom: var(--spacing-tiny);
}

.footer-contact__link-list {
  display: flex;
  justify-content: center;
  text-align: center;
  flex-flow: wrap;
}

.footer-contact__link-list a {
  text-decoration: none;
  padding: 0 var(--spacing-smaller) 0 0;
}

.footer-icon__list {
  display: flex;
  text-align: center;
  justify-content: space-around;
  margin-bottom: var(--spacing-small);
}

.footer-contact__link-address {
  display: flex;
}

.footer-contact__link-address span {
  padding-right: var(--spacing-tiny);
}

.footer-icon__list-item {
  margin: 0 calc(var(--spacing-small) / 2);
}

.footer-icon__list-item a img.app-icon {
  width: 1.2em;
  height: 1.2em;
}

@supports (display: grid) {
  .footer__wrapper {
    text-align: center;
    grid-row: 2;
    margin-bottom: var(--spacing-large);
  }

  .footer__wrapper.footer__wrapper--right {
    grid-row: 3;
    text-align: center;
  }

  .footer__header {
    grid-row: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 40px;
  }

  .footer__header .footer__header-title {
    margin-bottom: calc(var(--spacing-smaller) * 2);
  }

  .footer__header .body {
    color: var(--html-blue);
    font-weight: 700;
    width: 180px;
    text-align: center;
  }

  .footer__header img {
    width: 3.25rem;
    height: 3.25rem;
    margin-bottom:var(--spacing-small);
  }

  @media (min-width: 720px) {
    .footer-icon__list-item a img.app-icon {
      width: 1.4em;
      height: 1.4em;
    }

    .footer__header .body {
      margin-bottom: 0;
      width: auto;
    }

    .footer-copyright {
      text-align: right;
      width: 33%;
    }

    .footer__bottom {
      border-top: 3px solid var(--html-blue);
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-start;
    }

    .footer__bottom .footer__bottom-text {
      display: flex;
      flex-flow: row wrap;
      max-width: 33%;
    }

    .footer__bottom .footer__bottom-text span {
      padding-right: var(--spacing-smaller);
      margin-bottom: var(--spacing-tiny);
    }

    .footer__wrapper {
      grid-column: content-left;
      text-align: left;
      grid-row: 1;
    }

    .footer__wrapper.footer__wrapper--right {
      grid-column: content-right;
      text-align: right;
      grid-row: 1;
    }

    .footer-contact__header {
      text-align: right;
      margin-bottom: calc(var(--spacing-smaller) * 2 );
    }

    .footer-contact__link-list {
      flex-direction: column;
    }

    .footer-contact__link-list a {
      text-align: right;
      margin: 0 0 var(--spacing-small) 0;
      padding: 0 0 0 0;
    }

    .footer-contact__link-address {
      flex-direction: column;
    }

    .footer-contact__link-address span {
      padding-right: var(--spacing-tiny);
      margin-bottom: var(--spacing-tiny);
    }
  }
}

</style>
