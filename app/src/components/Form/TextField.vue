<template lang="pug">
  validation-provider(
    :name="name",
    :rules="rules",
    :vid="vid",
    v-slot="{ errors, touched, dirty }",
    slim,
  )
    span(:class="{'has-error': touched && dirty && errors.length }")
      a-input(
        :placeholder="placeholder",
        :type="type",
        v-model="innerValue",
        :value="value",
        :class="$style.input",
      )
      span(:class="$style.error", v-if="touched && dirty") {{errors[0]}}
</template>
<style module>
  .input {
    width: 100%;
  }
  .error {
    display: inline-block;
    color: var(--danger);
    font-size: 1.4rem;
    line-height: 1.5;
    margin-top: 0.3em;
    margin-bottom: 0.3em;
  }
</style>
<script>
import 'ant-design-vue/lib/form/style/css'
import { ValidationProvider } from 'vee-validate'

export default {
  components: {
    ValidationProvider,
  },
  props: {
    name: { type: String },
    placeholder: { type: String, default: '' },
    rules: { type: String },
    type: { type: String, default: 'text' },
    value: { type: String, default: '' },
    vid: { type: String },
  },
  data() {
    return {
      innerValue: '',
    }
  },
  watch: {
    value(val) {
      this.innerValue = val
    },
    innerValue(val) {
      this.$emit('input', val)
    },
  },
}
</script>
