<template>
  <div class="root">
    <header class="a11y-viewer">
      <div class="a11y-viewer__title-wrapper">
        <a
          href="https://www.colourblindawareness.org/about-us/campaigns/colour-blind-awareness-day/"
          target="_blank"
          rel="noopener noreferrer"
          class="h4 a11y-viewer__more-info"
        >
          Colour blindness awareness day
        </a>
        <span class="h5">Simulate visual impairment</span>
      </div>
      <form class="form" @change="setQueryParams">
        <label for="vision">
          <span class="sr-only">Select level of visual imparity</span>
          <select id="vision" v-model="vision">
            <optgroup label="Vision loss">
              <option value="normal">Normal vision</option>
              <option value="moderate">Moderate vision loss</option>
              <option value="severe">Severe vision loss</option>
              <option value="blindness">Blindness</option>
            </optgroup>
          </select>
        </label>

        <label for="color">
          <span class="sr-only">Select level of color blindness</span>
          <select id="color" name="color" v-model="color">
            <optgroup label="Color blindness">
              <option value="normal">No color blindness</option>
              <option value="no-red">No red (Protanopia)</option>
              <option value="low-red">Low red (Protanomaly)</option>
              <option value="no-green">No green (Deuteranopia)</option>
              <option value="low-green">Low green (Deuteranomaly)</option>
              <option value="no-blue">No blue (Tritanopia)</option>
              <option value="low-blue">Low blue (Tritanomaly)</option>
              <option value="no-color">No color (Achromatopsia)</option>
              <option value="almost-no-color">Almost no color (Achromatomaly)</option>
            </optgroup>
          </select>
        </label>

        <span>
          <input type="checkbox" id="keyboard-only" v-model="keyboardOnly">
          <label class="label-text body body--small" for="keyboard-only">
            Keyboard only
          </label>
        </span>

      </form>
    </header>
    <div :class="{
      'canvas': true,
      'is-disabled': keyboardOnly,
      [vision]: vision !== 'normal',
      [color]: color !== 'normal',
    }">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  data({ $route }) {
    return {
      vision: $route.query.vision || 'normal',
      color: $route.query.color || 'normal',
      keyboardOnly: $route.query.keyboardOnly || false,
    }
  },
  watch: {
    $route(oldRoute, newRoute) {
      if (oldRoute.name !== newRoute.name) {
        this.setQueryParams()
      }
    },
  },
  methods: {
    setQueryParams() {
      this.$router.replace({
        name: this.$route.name,
        query: {
          ...( this.vision !== 'normal' && { vision: this.vision } ),
          ...( this.color !== 'normal' && { color: this.color } ),
          ...( this.keyboardOnly && { keyboardOnly: this.keyboardOnly } ),
        }
      })
    },
  },
}
</script>

<style src="./a11y-viewer.css" scoped></style>
