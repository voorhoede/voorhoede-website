<template>
  <section class="page-contact">
    <page-header
      :title="page.title"
      :text="page.subtitle"
      :image="page.headerIllustration" />
    <div class="page-contact__backdrop grid">
      <div class="page-contact__content">
        <address-sidebar />
        <contact-page-form
          :subject-title="page.contactPageForm.subjectTitle"
          :contact-title="page.contactPageForm.contactTitle"
          :name-label="page.contactPageForm.nameLabel"
          :name-placeholder="page.contactPageForm.namePlaceholder"
          :email-label="page.contactPageForm.emailLabel"
          :email-placeholder="page.contactPageForm.emailPlaceholder"
          :phone-label="page.contactPageForm.phoneLabel"
          :phone-placeholder="page.contactPageForm.phonePlaceholder"
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
          :cta-label="page.contactPageForm.ctaButtonLabel" />
      </div>
    </div>
  </section>
</template>

<script>
  import { AddressSidebar, ContactPageForm, PageHeader } from '~/components'
  export default {
    components: {
      AddressSidebar,
      ContactPageForm,
      PageHeader,
    },
    async asyncData({ store, route }) {
      return await store.dispatch('getData', { route })
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
  grid-column-start: 2;
  grid-column-end: -2;
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
    grid-column-start: 2;
    grid-column-end: -2;
    background: var(--white);
    padding: var(--spacing-large) var(--spacing-large);
    justify-content: space-between;
  }

  .contact-address {
    width: 30%;
  }

  .contact-form {
    width: 60%;
  }
}

@media screen and (min-width: 1100px) {
  .page-contact__content {
    grid-column-start: 6;
    grid-column-end: -6;
    padding: var(--spacing-larger) var(--spacing-larger);
  }
}
</style>
