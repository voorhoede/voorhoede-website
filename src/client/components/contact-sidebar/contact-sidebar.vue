<template>
  <address class="contact-sidebar">
    <dl class="body">
      <dt>{{ emailLabel }}</dt>
      <dd><a class="font-html-blue" href="mailto:post@voorhoede.nl">post@voorhoede.nl</a></dd>
      <dt>{{ phoneLabel }}</dt>
      <dd><a href="tel:+31202610954" class="font-html-blue">+31 (0)20 2610954</a></dd>
      <dt>{{ addressLabel }}</dt>
      <dd class="font-html-blue">
        <div
          v-for="address in addresses"
          :key="address.googleMapsLink"
          class="contact-sidebar__address"
        >
          <a :href="address.googleMapsLink" target="_blank" rel="noreferrer noopener">
            {{ address.address }}
            <br>{{ address.postalCode }} {{ address.city }}
          </a>
        </div>
      </dd>
      <dt>KvK</dt>
      <dd class="font-html-blue">56017235</dd>
      <dt>BTW</dt>
      <dd class="font-html-blue">NL851944620B01</dd>
      <dt>IBAN</dt>
      <dd class="font-html-blue">NL14TRIO0320142078</dd>
    </dl>
  </address>
</template>

<script>
export default {
  props: {
    emailLabel: {
      type: String,
      default: '',
    },
    phoneLabel: {
      type: String,
      default: '',
    },
    addresses: {
      type: Array,
      required: true,
      validator(addresses) {
        return addresses.every((address) => (
          typeof(address.address) === 'string'
          && typeof(address.city) === 'string'
          && typeof(address.postalCode) === 'string'
        ))
      },
    },
    addressLabel: {
      type: String,
      default: '',
    },
  },
}
</script>

<style>
  .contact-sidebar a:hover,
  .contact-sidebar a:focus {
    padding-bottom: .15rem;
    background: transparent linear-gradient(to top, var(--html-blue) 2px, transparent 2px);
  }

  .contact-sidebar__address + .contact-sidebar__address {
    margin-top: var(--spacing-small);
  }
</style>
