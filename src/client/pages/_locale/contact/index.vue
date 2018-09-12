<template>
  <section class="page-contact">
    <page-header
      :title="page.title"
      :text="page.subtitle"
      :image="page.headerIllustration" />
    <div class="page-contact__backdrop grid grid">
      <div class="page-contact__content grid">
        <address class="body contact-address">
          <span>Email us at</span>
          <br>
          <a class="font-html-blue" href="mailto:post@voorhoede.nl">post@voorhoede.nl</a>
          <br>
          <br>
          <span>Call us at</span>
          <br>
          <a class="font-html-blue">+31 (0)20 2610954</a>
          <br>
          <br>
          <span>Visit us at:</span>
          <br>
          <span class="font-html-blue">Rijnsburgstraat 9-11</span>
          <br>
          <span class="font-html-blue">1059 AT Amsterdam</span>
        </address>
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
  import { PageHeader, ContactPageForm } from '~/components'
  export default {
    components: {
      ContactPageForm,
      PageHeader,
    },
    async asyncData({ store, route }) {
      return await store.dispatch('getData', { route })
    },
  }
</script>

<style>
.contact-page {
  grid-column-start: 2;
  grid-column-end: 10;
}

.contact-address {
  display: none;
  padding-top: var(--spacing-large);
  grid-column-start: 2;
  grid-column-end: 10;
}

.contact-form {
  grid-column-start: 1;
  grid-column-end: 48;
}

.page-contact__backdrop {
  background-color: white;
}

.page-contact__content {
  background-color: white;
}

@media screen and (min-width: 720px) {
  .contact-form {
    grid-column-start: 12;
    grid-column-end: 34;
  }

  .page-contact__backdrop {
    background-color: var(--bg-pastel);
  }

  .contact-address {
    display: block;
  }

  .page-contact .page-header__image {
    top: var(--spacing-large);
    height: 90%;
  }

  .page-contact .page-header__image img {
    width: auto;
  }
}

@media screen and (min-width: 1100px) {
  .contact-address {
    grid-column-start: 2;
    grid-column-end: 12;
  }

  .contact-form {
    grid-column-start: 17;
    grid-column-end: 50;
  }

  .page-contact .page-header__image {
    top: var(--spacing-larger);
  }
}

@media screen and (min-width: 1440px) {
  .contact-address {
    grid-column-start: 4;
    grid-column-end: 10;
  }

  .contact-form {
    grid-column-start: 18;
    grid-column-end: 48;
  }
}
</style>
