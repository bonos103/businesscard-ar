<template lang="pug">
  a-modal(:visible="value", :footer="null", :width="width", @cancel="handleCancel")
    div(:class="$style.body")
      div(:class="$style.title", v-if="$slots.title || title")
        slot(name="title") {{title}}
      div(:class="$style.text", v-if="$slots.text || text")
        slot(name="text") {{text}}
      div(:class="$style.buttonGroup")
        a-button(:class="$style.button", @click="handleCancel") いいえ
        a-button(type="primary", :class="$style.button", @click="$emit('ok')") はい
</template>
<style lang="postcss" module>
  .body {
    padding-top: 18px;
  }
  .title{
    font-size: 1.8rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 1em;
  }
  .text {
    font-size: 1.5rem;
    text-align: center;
    @media (--sm) {
      & br {
        display: none;
      }
    }
  }
  .buttonGroup {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 20px;
    margin-left: -4px;
    margin-right: -4px;
  }
  .button {
    margin-left: 4px;
    margin-right: 4px;
  }
</style>
<script>
export default {
  props: {
    value: { type: Boolean, default: false },
    width: { type: [String, Number], default: 460 },
    title: { type: String, default: '' },
    text: { type: String, default: '' },
  },
  methods: {
    handleCancel() {
      this.$emit('cancel')
    },
  },
}
</script>
