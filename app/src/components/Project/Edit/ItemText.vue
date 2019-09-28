<template lang="pug">
  div(:class="$style.item", :style="boxStyle", :active="active", ref="item")
    div {{item.value}}
</template>
<style module>
  .item {
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(-50%, -50%);
  }
</style>
<script>
import EventListener from '@/utils/mixins/EventListener'

export default {
  mixins: [EventListener],
  props: {
    active: { type: Boolean, default: false },
    item: { type: Object },
  },
  computed: {
    boxStyle() {
      return {
        top: `${this.item.y * 100 * -1}px`,
        left: `${this.item.x * 100}px`,
        width: `${this.item.width * 100}px`,
        height: `${this.item.height * 100}px`,
      }
    },
  },
  mounted() {
    const self = this
    this.$listen(this.$parent.$el, 'click', (e) => {
      console.log(self.$el.contains(e.target))
      if (self.$el.contains(e.target)) {
        self.$emit('activate')
      } else {
        self.$emit('deactivate')
      }
    })
  },
}
</script>
