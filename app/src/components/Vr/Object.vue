<template lang="pug">
  div#target1(:class="$style.wrapper", :style="objectStyle")
    | {{text || item.value}}
</template>
<style module>
  .wrapper {
    /* display: inline-flex;
    justify-content: center; */
    white-space: pre-wrap;
  }
</style>
<script>
export default {
  name: 'Object',
  props: {
    text: {
      type: String,
      default: '',
    },
    item: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  computed: {
    objectStyle() {
      return {
        fontSize: `${(this.item.font_size * 2) || 36}px`,
        color: this.item.color || 'blue',
        textAlign: this.item.align || 'left',
        width: `${this.item.width * 200 || 900}px`,
        height: `${this.item.height * 200 || 300}px`,
      }
    },
  },
}
</script>
