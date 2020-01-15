<template>
  <div class="input-checkbox">
    <input
      type="checkbox"
      :id="id"
      :name="name"
      ref="input"
      v-bind="$attrs"
      @input="updateInput"
      class="input-checkbox__input"
    >
    <label
      :for="id"
      class="input-checkbox__label"
      :class="{ 'field-is-invalid': isInvalid }"
    >
      {{ !isInvalid ? label : validationErrorMessage }}
    </label>
  </div>
</template>

<script>
  export default {
    inheritAttrs: false,
    props: {
      id: {
        type: String,
        required: true
      },
      label: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
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
          this.valid = this.$refs.input.checkValidity()
        })
      },
    },
    mounted() {
      this.valid = this.$refs.input.checkValidity()
    },
    methods: {
      updateInput(e) {
        this.$emit('input', e.target.checked)
      },
    },
  }
</script>

<style>
  .input-checkbox {
    display: flex;
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

  .input-checkbox__label:before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 16px;
    height: 16px;
    border: 1px solid var(--html-blue);
  }

  .input-checkbox__input:checked + .input-checkbox__label:after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 16px;
    height: 16px;
    background: var(--html-blue);
  }

  .field-is-invalid {
    color: var(--soft-red);
  }
</style>
