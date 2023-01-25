<template>
  <div
    class="input-field"
    :class="$attrs.class"
  >
    <label
      :for="id"
      class="input-field__label"
    >
      {{ label }}
    </label>
    <span
      v-if="isInvalid"
      role="alert"
      class="input-field__error"
    >
      {{ validationErrorMessage }}
    </span>
    <textarea
      v-if="textarea"
      :id="id"
      :name="name || id"
      :type="type"
      :placeholder="placeholderLabel"
      :required="required"
      :value="value"
      class="body"
      :class="{ 'is-invalid': isInvalid }"
      rows="5"
      ref="input"
      :aria-invalid="isInvalid"
      @input="updateInput"
    />
    <input
      v-else
      :id="id"
      :name="name || id"
      :value="value"
      :type="type"
      :placeholder="placeholderLabel"
      :required="required"
      class="input-field__input body"
      :class="{ 'is-invalid': isInvalid }"
      ref="input"
      :aria-invalid="isInvalid"
      @input="updateInput"
    >
  </div>
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
      name: {
        type: String,
        default: '',
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
      resetValidation: {
        type: Boolean,
        default: false
      },
      validate: {
        type: Boolean,
        required: false,
        default: false,
      },
      validationErrorMessage: {
        type: String,
        required: false,
        default: ''
      },
      textarea: {
        type: Boolean,
        default: false,
      },
      required: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
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
          this.checkValidity()
        })
      },
      resetValidation() {
        this.valid = true
        this.$nextTick(() => {
          this.checkValidity()
        })
      }
    },
    mounted() {
      this.checkValidity()
    },
    methods: {
      updateInput(e) {
        this.$emit('input', e.target.value)
      },
      checkValidity() {
        this.valid = this.$refs.input.checkValidity()
      }
    },
  }
</script>
