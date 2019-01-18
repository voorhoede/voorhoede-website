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
          :address-label="page.addressLabel" />
        <contact-page-form
          :subject-title="page.contactPageForm.subjectTitle"
          :contact-title="page.contactPageForm.contactTitle"
          :name-label="page.contactPageForm.nameLabel"
          :name-placeholder="page.contactPageForm.namePlaceholder"
          :name-error-message="page.contactPageForm.nameErrorMessage"
          :email-label="page.contactPageForm.emailLabel"
          :email-placeholder="page.contactPageForm.emailPlaceholder"
          :email-error-message-empty="page.contactPageForm.emailErrorMessageEmpty"
          :email-error-message-incorrect="page.contactPageForm.emailErrorMessageIncorrect"
          :phone-label="page.contactPageForm.phoneLabel"
          :phone-placeholder="page.contactPageForm.phonePlaceholder"
          :phone-error-message="page.contactPageForm.phoneErrorMessage"
          :business-label="page.contactPageForm.businessLabel"
          :business-placeholder="page.contactPageForm.businessPlaceholder"
          :website-label="page.contactPageForm.websiteLabel"
          :website-placeholder="page.contactPageForm.websitePlaceholder"
          :subject-label="page.contactPageForm.subjectLabel"
          :subject-options="page.contactPageForm.subjectOptions"
          :budget-label="page.contactPageForm.budgetLabel"
          :budget-options="page.contactPageForm.budgetOptions"
          :project-label="page.contactPageForm.projectLabel"
          :project-placeholder="page.contactPageForm.projectPlaceholder"
          :project-error-message="page.contactPageForm.projectErrorMessage"
          :cta-label="page.contactPageForm.ctaButtonLabel" />
      </div>
    </div>
  </section>
</template>

<script>
  import asyncData from '~/lib/async-page'
  import { AddressSidebar, ContactPageForm, PageHeader } from '~/components'

  export default {
    components: { AddressSidebar, ContactPageForm, PageHeader },
    asyncData,
    head() {
      return {
        title: this.page.social.title,
        meta: [
          { 'name': 'description', 'content': this.page.social.description },
          { 'name': 'description', 'content': this.page.social.description },
          { 'property': 'og:description', 'content': this.page.social.description },
          { 'name': 'keywords', 'content': this.page.keywords }
        ]
      }
    }
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

  .contact-form {
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

    .contact-form {
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
