<template>
  <div class="input-checkbox">
    <input
      type="checkbox"
      :id="id"
      :name="name"
      :aria-invalid="isInvalid"
      ref="input"
      v-bind="$attrs"
      @input="updateInput"
      class="input-checkbox__input"
    >
    <label
      :for="id"
      class="input-checkbox__label"
    >
      {{ label }}
    </label>
    <span
      v-if="isInvalid"
      role="alert"
      class="input-checkbox__error"
    >
      {{ validationErrorMessage }}
    </span>
  </div>
</template>

<script>
  export default {
    inheritAttrs: false,
    model: {
      prop: 'checked',
      event: 'change',
    },
    props: {
      id: {
        type: String,
        required: true,
      },
      label: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      resetValidation: {
        type: Boolean,
        default: false,
      },
      validate: {
        type: Boolean,
        default: false,
      },
      validationErrorMessage: {
        type: String,
        default: '',
      },
      checked: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        valid: false,
      }
    },
    computed: {
      isInvalid() {
        return this.validate && !this.valid
      },
    },
    watch: {
      checked() {
        this.$nextTick(() => {
          this.checkValidity()
        })
      },
      resetValidation() {
        this.valid = true
        this.$nextTick(() => {
          this.checkValidity()
        })
      },
    },
    mounted() {
      this.checkValidity()
    },
    methods: {
      updateInput(e) {
        this.$emit('change', e.target.checked)
      },
      checkValidity() {
        this.valid = this.$refs.input.checkValidity()
      },
    },
  }
</script>

<style>
  .input-checkbox {
    display: flex;
    flex-wrap: wrap;
  }

  .input-checkbox__input {
    order: 1;
    overflow: hidden;
    position: absolute;
    margin: -1px;
    padding: 0;
    width: 1px;
    height: 1px;
    border: 0;
    clip: rect(0 0 0 0);
  }

  .input-checkbox__label {
    order: 2;
    position: relative;
    padding-left: 25px;
    cursor: pointer;
  }

  .input-checkbox__label::before {
    content: '';
    display: block;
    position: absolute;
    top: 3px;
    left: 0;
    width: 1rem;
    height: 1rem;
    border: 1px solid var(--html-blue);
  }

  .input-checkbox__input:focus + .input-checkbox__label::before {
    border-width: 2px;
  }

  .input-checkbox__input:checked + .input-checkbox__label::after {
    content: '';
    display: block;
    position: absolute;
    top: 3px;
    left: 0;
    width: 1rem;
    height: 1rem;
    background: url('/images/checkmark.svg') center no-repeat;
    background-size: 10px;
  }

  .input-checkbox__error {
    flex: 0 0 100%;
    order: 3;
    margin-top: var(--spacing-tiny);
    margin-left: 25px;
    color: var(--soft-red);
  }
</style>
