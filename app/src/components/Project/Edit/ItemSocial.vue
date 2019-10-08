<template lang="pug">
  item-block(:item="item", :active="active")
    template(v-slot="{ textStyle, handleChangeValue }")
      img(:src="item.image", :class="$style.image")
</template>
<style module>
  .image {
    width: 100%;
    height: auto;
  }
</style>
<script>
import ItemBlock from '@/components/Project/Edit/ItemBlock.vue'

export default {
  props: {
    active: { type: Boolean, default: true },
    item: { type: Object },
  },
  components: {
    ItemBlock,
  },
}
</script>
