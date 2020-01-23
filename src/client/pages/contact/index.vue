<template>
  <div>
    <section class="page-contact">
      <page-header
        heading="byline"
        :byline="page.title"
        :headline="page.subtitle"
        :image="page.headerIllustration"
      />
      <div class="page-contact__backdrop grid">
        <div class="page-contact__content">
          <contact-sidebar
            :email-label="page.emailLabel"
            :phone-label="page.phoneLabel"
            :address-label="page.addressLabel"
            :addresses="app.addresses"
          />
          <contact-form
            :aria-label="$t('lets_discuss')"
          />
        </div>
      </div>
    </section>
    <newsletter-form />
  </div>
</template>

<script>
  import asyncData from '~/lib/async-page'
  import head from '~/lib/seo-head'

  import ContactSidebar from '~/components/contact-sidebar'
  import ContactForm from '~/components/contact-form'
  import PageHeader from '~/components/page-header'
  import NewsletterForm from '~/components/newsletter-form'

  export default {
    components: { ContactSidebar, ContactForm, PageHeader, NewsletterForm },
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
    background-color: var(--white);
  }

  .page-contact__backdrop {
    background-color: var(--white);
  }

  .page-contact .contact-sidebar {
    margin-bottom: var(--spacing-larger);
  }

  .page-contact .contact-sidebar dd {
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

    .page-contact .contact-sidebar {
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
