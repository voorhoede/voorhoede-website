<template>
  <section class="page-contact">
    <page-header
      :title="page.title"
      :text="page.subtitle"
      :image="page.headerIllustration"
    />
    <div class="page-contact__content">
      <address-sidebar
        :email-label="page.emailLabel"
        :phone-label="page.phoneLabel"
        :address-label="page.addressLabel"
      />
      <contact-form
        :aria-label="$t('lets_discuss')"
      />
    </div>
  </section>
</template>

<script>
  import asyncData from '~/lib/async-page'
  import head from '~/lib/seo-head'
  import { AddressSidebar, ContactForm, PageHeader } from '~/components'

  export default {
    components: { AddressSidebar, ContactForm, PageHeader },
    asyncData,
    head,
  }
</script>

<style>
  .page-contact {
    background-color: var(--bg-pastel);
  }

  .page-contact__content {
    padding: var(--spacing-large) var(--grid-margin) 0;
    grid-column: var(--grid-page);
    display: flex;
    flex-direction: column-reverse;
    background-color: var(--white);
  }

  .page-contact .address-sidebar {
    margin-bottom: var(--spacing-larger);
  }

  .page-contact .address-sidebar__value {
    margin-bottom: var(--spacing-small);
  }

  .page-contact .contact-form {
    margin-bottom: var(--spacing-larger);
  }

  @media screen and (min-width: 720px) {
    .page-contact__content {
      padding: var(--spacing-larger) var(--spacing-large);
      flex-direction: row;
      justify-content: space-between;
      grid-column: var(--grid-content);
      background: var(--white);
    }

    .page-contact .address-sidebar {
      width: 30%;
    }

    .page-contact .contact-form {
      width: 65%;
    }
  }

  @media screen and (min-width: 1100px) {
    .page-contact__content {
      grid-column: var(--grid-content-narrow);
      padding: var(--spacing-larger) var(--spacing-larger);
    }
  }
</style>
