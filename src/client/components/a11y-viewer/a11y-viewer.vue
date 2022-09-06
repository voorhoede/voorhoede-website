<template>
  <div class="root">
    <header class="a11y-viewer" :class="{'is-open': open}">
      <div class="a11y-viewer__title-wrapper">
        <p class="h4">Colour blindness awareness day</p>
        <p class="h5 a11y-viewer__title">Simulate visual impairment</p>
      </div>
      <form class="form">
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
  data() {
    return {
      vision: 'normal',
      color: 'normal',
      keyboardOnly: false,
    }
  },
}
</script>

<style src="./a11y-viewer.css" scoped></style>
