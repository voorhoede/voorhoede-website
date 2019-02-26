<template>
  <section class="page-contact">
    <page-header
      :title="page.title"
      :text="page.subtitle"
      :image="page.headerIllustration" />
    <div class="page-contact__backdrop grid">
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
    padding-top: var(--spacing-large);
    display: flex;
    flex-direction: column-reverse;
    background-color: white;
  }

  .page-contact__backdrop {
    background-color: white;
  }

  .contact-address {
    margin-bottom: var(--spacing-larger);
  }

  .contact-address dd {
    margin-bottom: var(--spacing-small);
  }

  .page-contact .contact-form {
    margin-bottom: var(--spacing-larger);
  }

  @media screen and (min-width: 720px) {
    .page-contact__backdrop {
      background-color: var(--bg-pastel);
    }

    .page-contact__content {
      flex-direction: row;
      background: var(--white);
      padding: var(--spacing-larger) var(--spacing-large);
      justify-content: space-between;
    }

    .contact-address {
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
