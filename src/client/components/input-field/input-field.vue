<template>
  <label>
    <span class="body-petite" :class="{ 'field-is-invalid': isInvalid }">
      {{ !isInvalid ? label : validationErrorMessage }}
    </span>
    <input
      :id="id"
      :name="id"
      :value="value"
      :type="type"
      :placeholder="placeholderLabel"
      class="body"
      :class="{ 'is-invalid': isInvalid }"
      v-bind="$attrs"
      ref="input"
      @input="updateInput"
    >
  </label>
</template>

<script>
  export default {
    inheritAttrs: false,
    props: {
      type: {
        type: String,
        required: true
      },
      id: {
        type: String,
        required: true
      },
      label: {
        type: String,
        required: true
      },
      value: {
        type: String,
        required: false,
        default: ''
      },
      placeholderLabel: {
        type: String,
        required: true
      },
      validate: {
        type: Boolean,
        required: true
      },
      validationErrorMessage: {
        type: String,
        required: false,
        default: ''
      }
    },
    data() {
      return {
        isFocused: false,
        valid: false
      }
    },
    computed: {
      isInvalid() {
        return this.validate && !this.valid
      }
    },
    watch: {
      value() {
        this.$nextTick(() => {
          this.valid = this.$refs.input.checkValidity()
        })
      },
    },
    mounted() {
      this.valid = this.$refs.input.checkValidity()
    },
    methods: {
      updateInput(e) {
        this.$emit('input', e.target.value)
      },
    },
  }
</script>

<style>
  .field-is-invalid {
    color: var(--soft-red);
  }
</style>
