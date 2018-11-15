<template>
  <address class="contact-address">
    <dl class="body">
      <dt>{{ emailLabel }}</dt>
      <dd><a class="font-html-blue" href="mailto:post@voorhoede.nl">post@voorhoede.nl</a></dd>
      <dt>{{ phoneLabel }}</dt>
      <dd><a href="tel:+31202610954" class="font-html-blue">+31 (0)20 2610954</a></dd>
      <dt>{{ addressLabel }}</dt>
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
    addressLabel: {
      type: String,
      default: '',
    },
  }
}
</script>

<style>
.contact-address a:hover,
.contact-address a:focus {
  padding-bottom: .15rem;
  background: transparent linear-gradient(to bottom, transparent 90%, var(--html-blue) 95%, var(--html-blue) 100%);
}
</style>
