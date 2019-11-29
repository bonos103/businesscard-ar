<template lang="pug">
  item-block(:item="item", :active="active")
    template(v-slot="{ textStyle, handleChangeValue }")
      img(:src="iconImage", :class="$style.image")
</template>
<style module>
  .image {
    width: 100%;
    height: auto;
  }
</style>
<script>
import ItemBlock from '@/components/Project/Edit/ItemBlock.vue'
import SocialIcon from '@/utils/SocialIcon'

export default {
  props: {
    active: { type: Boolean, default: true },
    item: { type: Object },
  },
  components: {
    ItemBlock,
  },
  computed: {
    iconImage() {
      return (new SocialIcon(this.item.value)).src
    },
  },
}
</script>
