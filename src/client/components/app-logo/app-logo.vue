<template>
  <LogoWithText v-if="showText"/>
  <Logo v-else/>
</template>

<script>
import Logo from '../../static/images/logo.svg'
import LogoWithText from '../../static/images/logo-with-text.svg'

export default {
  props: {
    showText: {
      type: Boolean,
      default: false,
    }
  },
  components: { Logo, LogoWithText },
}
</script>

<style>
</style>
