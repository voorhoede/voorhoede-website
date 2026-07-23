<template>
  <footer class="app-footer grid">
    <div class="app-footer__layout">
      <div class="app-footer__header">
        <app-link
          class="app-footer__header-link"
          :to="$localeUrl()"
          :aria-label="$t('home')"
          :title="$t('home')"
        >
          <img
            class="app-footer__header-logo"
            src="/images/logo-with-text.svg"
            alt=""
            width="190"
            height="32"
          >
        </app-link>
      </div>
      <nav
        v-if="exploreLinks.length"
        class="app-footer__column"
        aria-label="Explore"
      >
        <ul class="app-footer__list">
          <li
            v-for="link in exploreLinks"
            :key="link.id"
            class="app-footer__list-item body-small"
          >
            <app-link
              class="app-footer__link"
              :to="useDatoNuxtRoute(link.link)"
            >
              {{ link.title }}
            </app-link>
          </li>
        </ul>
      </nav>

      <nav
        v-for="group in footerGroups"
        :key="group.id"
        :class="groupNavClass(group)"
        :ref="groupRefName(group)"
      >
        <h2 class="h4 app-footer__title">
          {{ group.title }}
        </h2>
        <ul
          class="body-small app-footer__list"
          :class="{ 'app-footer__list--contact': isContactGroup(group) }"
        >
          <li
            v-for="item in group.items"
            :key="item.id"
            class="app-footer__list-item"
          >
            <template v-if="item.__typename === 'MenuItemContactRecord'">
              <a
                v-if="item.contact?.__typename === 'PhoneLinkRecord'"
                :href="`tel:${cleanPhone(item.contact.phoneNumber)}`"
                class="app-footer__link"
                @click="trackPhoneLink()"
              >{{ item.contact.title || item.contact.phoneNumber }}</a>
              <a
                v-else-if="item.contact?.__typename === 'EmailLinkRecord'"
                :href="`mailto:${item.contact.emailAddress}`"
                class="app-footer__link"
                @click="trackEmailLink()"
              >{{ item.contact.title || item.contact.emailAddress }}</a>
            </template>
            <a
              v-else-if="item.__typename === 'MenuItemExternalRecord'"
              :href="item.link"
              class="app-footer__link app-footer__link--right"
              target="_blank"
              rel="noreferrer noopener"
            >
              <span
                v-for="(line, index) in addressLines(item.title)"
                :key="index"
              >{{ line }}</span>
            </a>
            <app-link
              v-else-if="item.__typename === 'MenuItemInternalRecord'"
              class="app-footer__link"
              :to="useDatoNuxtRoute(item.link)"
            >
              {{ item.title }}
            </app-link>
          </li>
        </ul>
      </nav>

      <div class="app-footer__list">
        <ul class="app-footer__list--icon">
          <li
            v-for="social in app.socials"
            :key="social.id"
            class="app-footer__list-item--icon"
          >
            <a :href="social.url" target="_blank" rel="noreferrer noopener">
              <span class="sr-only">
                {{ social.icon?.title || social.icon?.name }}
              </span>
              <app-icon :name="social.icon?.name" size="large" />
            </a>
          </li>
        </ul>
      </div>
    </div>

    <ul
      v-if="app.certificates?.length"
      class="app-footer__certificate-list"
    >
      <li
        v-for="certificate in app.certificates"
        :key="certificate.id"
      >
        <a
          v-if="certificate.__typename === 'MenuItemExternalRecord'"
          :href="certificate.link"
          target="_blank"
          rel="noreferrer noopener"
          :aria-label="certificate.title"
        >
          <dato-image
            class="app-footer__certificate-logo"
            :src="certificate.image.url"
            :width="100"
            :height="75"
            alt=""
            loading="lazy"
          />
        </a>
        <app-link
          v-else
          :to="useDatoNuxtRoute(certificate.link)"
          :aria-label="certificate.title"
        >
          <dato-image
            class="app-footer__certificate-logo"
            :src="certificate.image.url"
            :width="100"
            :height="75"
            alt=""
            loading="lazy"
          />
        </app-link>
      </li>
    </ul>

    <div class="app-footer__bottom">
      <div class="body-detail app-footer__bottom-text">
        <dl class="app-footer__definition-list">
          <template
            v-for="item in app.legalItems"
            :key="item.id"
          >
            <dt class="app-footer__definition-list-title">
              {{ item.variable?.displayTitle || item.variable?.title }}
            </dt>
            <dd class="app-footer__definition-list-value">
              {{ item.variable?.value }}
            </dd>
          </template>
        </dl>
      </div>
      <div class="body-detail">
        <template
          v-for="(link, index) in app.privacy"
          :key="link.id"
        >
          <a
            :href="link.url"
            class="app-footer__copyright"
            :aria-label="link.title"
            target="_blank"
            rel="noreferrer noopener"
          >{{ link.title }}</a>
          <span v-if="index < app.privacy.length - 1"> - </span>
        </template>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  props: {
    app: { type: Object, required: true },
  },
  data() {
    return {
      observer: null,
    };
  },
  computed: {
    exploreLinks() {
      return (this.app.footerItems || []).filter(
        (item) => item.__typename === 'MenuItemInternalRecord',
      );
    },
    footerGroups() {
      return (this.app.footerItems || []).filter(
        (item) => item.__typename === 'MenuItemGroupRecord',
      );
    },
  },
  mounted() {
    if ("IntersectionObserver" in window) {
      this.observeContact();
    }
  },
  beforeUnmount() {
    if (this.observer !== null) {
      this.unobserveContact();
    }
  },
  methods: {
    isContactGroup(group) {
      return (group.items || []).some(
        (item) => item.__typename === 'MenuItemContactRecord',
      );
    },
    groupNavClass(group) {
      return this.isContactGroup(group) ? undefined : 'app-footer__list-address';
    },
    groupRefName(group) {
      return this.isContactGroup(group) ? undefined : 'contact';
    },
    addressLines(title) {
      return String(title || '').split('\n').filter(Boolean);
    },
    cleanPhone(phoneNumber) {
      return String(phoneNumber || '').replace(/[^0-9]/g, '');
    },
    observeContact() {
      const contactElement = this.$refs.contact;
      const el = Array.isArray(contactElement) ? contactElement[0] : contactElement;
      if (!el) return;
      this.observer = new IntersectionObserver(function (entries) {
        if (entries.some((entry) => entry.isIntersecting)) {
          this.unobserve(el);
        }
      });
      this.observer.observe(el);
    },
    trackPhoneLink() {
      useTrackEvent("Click on phone number");
    },
    trackEmailLink() {
      useTrackEvent("Click on email");
    },
    unobserveContact() {
      const contactElement = this.$refs.contact;
      const el = Array.isArray(contactElement) ? contactElement[0] : contactElement;
      if (el && this.observer) {
        this.observer.unobserve(el);
      }
    },
  },
};
</script>

<style>
:root {
  --footer-list-height: 140px;
  --logo-width: 180px;
}

.app-footer {
  width: 100%;
  padding: var(--spacing-larger) 0 var(--spacing-small) 0;
  background-color: var(--brand-yellow);
}

.app-footer__layout {
  grid-row: 1;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid var(--black);
  padding-bottom: var(--spacing-small);
  margin-bottom: var(--spacing-large);
}

  .app-footer__header-link {
    padding: var(--spacing-small) 0;
    display: flex;
  }

@media (min-width: 768px) {
  .app-footer__layout {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: var(--spacing-larger);
    flex-wrap: wrap;
  }
}

@media (min-width: 1400px) {
  .app-footer__layout {
    flex-wrap: nowrap;
  }
}

.app-footer__header {
  flex-basis: 100%;
}

@media (min-width: 1400px) {
  .app-footer__header {
    flex-basis: auto;
  }
}

.app-footer__bottom {
  margin-bottom: var(--spacing-medium);
}

@media (min-width: 520px) {
  .app-footer__bottom {
    text-align: center;
  }
}

.app-footer__definition-list {
  display: grid;
  grid-template-columns: 30px 1fr;
  margin-bottom: var(--spacing-small);
}

@media (min-width: 520px) {
  .app-footer__definition-list {
    display: flex;
    justify-content: center;
  }
}

@media (min-width: 520px) {
  .app-footer__definition-list-title {
    font-weight: bold;
  }

  .app-footer__definition-list-value {
    padding-left: var(--spacing-tiny);
  }

  .app-footer__definition-list-value::after {
    content: "|";
    padding: 0 var(--spacing-small);
  }

  .app-footer__definition-list-value:last-child::after {
    display: none;
  }
}

.app-footer__definition-list-title {
  font-weight: bold;
}

.app-footer__copyright,
.app-footer__privacy {
  text-decoration: none;
  border-bottom: 1px solid var(--black);
}

.app-footer__copyright:hover,
.app-footer__copyright:focus,
.app-footer__privacy:hover,
.app-footer__privacy:focus {
  color: var(--html-blue);
  border-bottom: none;
}

.app-footer__title {
  color: var(--black);
  margin-bottom: var(--spacing-smaller);
}

.app-footer__list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: var(--spacing-tiny);
  margin-bottom: var(--spacing-small);
}

@media (min-width: 768px) {
  .app-footer__column {
    flex-basis: 20%;
  }

  .app-footer__list {
    display: block;
  }
}

@media (min-width: 768px) {
  .app-footer__list {
    display: flex;
    flex-flow: column wrap;
    justify-content: flex-start;
    max-height: var(--footer-list-height);
    gap: var(--spacing-small);
    padding-bottom: 0;
  }
}

.app-footer__list--contact {
  grid-template-columns: auto;
}

.app-footer__certificate-list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  border-bottom: 1px solid var(--black);
  gap: var(--spacing-small);
  margin-bottom: var(--spacing-large);
  padding-bottom: var(--spacing-large);
  justify-content: center;
}

@media (min-width: 768px) {
  .app-footer__certificate-list {
    margin-bottom: var(--spacing-larger);
    padding-bottom: var(--spacing-larger);
    gap: var(--spacing-larger);
  }
}

.app-footer__certificate-logo {
  width: 100%;
  object-fit: contain;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.7;
  }
}

.app-footer__list-address {
  margin-bottom: var(--spacing-small);
}

.app-footer__list--icon {
  display: flex;
  margin-bottom: var(--spacing-small);
}

@media (min-width: 768px) {
  .app-footer__list--icon {
    margin-bottom: 0;
  }
}

.app-footer__list-item {
  text-decoration: none;
    display: flex
}

.app-footer__list-item--icon {
  margin-right: var(--spacing-small);
}

.app-footer__list-item--icon a {
  display: block;
  fill: var(--html-blue);
}

.app-footer__link {
  position: relative;
  z-index: var(--z-index-low);
  text-decoration: none;
  padding-top: var(--spacing-tiny);
}

@media (min-width: 768px) {
  .app-footer__link {
    padding-block: 0;
    padding-top: var(--spacing-smaller);
    margin-top: calc(var(--spacing-smaller) * -1);
  }
}

.app-footer__link:hover,
.app-footer__link:focus {
  color: var(--html-blue);
  background: transparent
    linear-gradient(to top, var(--html-blue) 1px, transparent 1px);
}

.app-footer__link--right {
  display: inline-flex;
  flex-direction: column;
  justify-content: flex-end;
}

.app-footer__link--right:hover,
.app-footer__link--right:focus {
  background: none;
}

.app-footer__link--right:hover > span,
.app-footer__link--right:focus > span {
  background-image: linear-gradient(
    to right,
    var(--html-blue),
    var(--html-blue)
  );
  background-repeat: no-repeat;
  background-position: 0 80%;
  background-size: 100% 1px;
}

.app-footer__header-logo {
  width: var(--logo-width);
  margin-bottom: var(--spacing-small);
}
</style>
