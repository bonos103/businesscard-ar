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
import twitterIcon from '@/assets/images/project/sns/twitter.png'
import facebookIcon from '@/assets/images/project/sns/facebook.png'
import instagramIcon from '@/assets/images/project/sns/instagram.png'

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
      const match = this.item.value.match(/twitter|facebook|instagram/)
      if (match[0] === 'twitter') {
        return twitterIcon
      }
      if (match[0] === 'facebook') {
        return facebookIcon
      }
      if (match[0] === 'instagram') {
        return instagramIcon
      }
      return ''
    },
  },
}
</script>
