<template>
  <section class="page-contact">
    <page-header
      :title="page.title"
      :text="page.subtitle"
      :image="page.headerIllustration" />
    <div class="page-contact__backdrop grid">
      <div class="page-contact__content">
        <address class="contact-address">
          <dl class="body">
            <dt>Email us at</dt>
            <dd><a class="font-html-blue" href="mailto:post@voorhoede.nl">post@voorhoede.nl</a></dd>
            <dt>Call us at</dt>
            <dd><a href="tel:+31202610954" class="font-html-blue">+31 (0)20 2610954</a></dd>
            <dt>Visit us at:</dt>
            <dd class="font-html-blue">
              <a href="https://www.google.nl/maps/place/De+Voorhoede+%7C+Front-end+Development/@52.3477995,4.8485761,17z/data=!3m1!4b1!4m5!3m4!1s0x47c5e21d502d2d59:0xbf570944a96ebf45!8m2!3d52.3477962!4d4.8507648">Rijnsburgstraat 9-11<br>1059 AT Amsterdam</a>
            </dd>
            <dt>KvK</dt>
            <dd class="font-html-blue">56017235</dd>
            <dt>BTW</dt>
            <dd class="font-html-blue">NL851944620B01</dd>
            <dt>IBAN</dt>
            <dd class="font-html-blue">NL20ABNA0442829159</dd>
          </dl>
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
