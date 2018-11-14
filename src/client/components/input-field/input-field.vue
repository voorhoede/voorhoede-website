<template>
  <label class="input-field">
    <span class="input-field__label body-petite" :class="{ 'field-is-invalid': isInvalid }">
      {{ !isInvalid ? label : validationErrorMessage }}
    </span>
    <textarea
      v-if="textarea"
      :id="id"
      :name="id"
      :value="value"
      :type="type"
      :placeholder="placeholderLabel"
      class="body"
      :class="{ 'is-invalid': isInvalid }"
      v-bind="$attrs"
      ref="input"
      rows="5"
      @input="updateInput"
    />
    <input
      v-else
      :id="id"
      :name="id"
      :value="value"
      :type="type"
      :placeholder="placeholderLabel"
      class="input-field__input body"
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
      },
      textarea: {
        type: Boolean,
        default: false,
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
  @import '../app-core/variables.css';

  .field-is-invalid {
    color: var(--soft-red);
  }
</style>
