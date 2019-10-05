<template lang="pug">
  item-block(:item="item", :active="active")
    template(v-slot="{ textStyle, handleChangeValue }")
      a-textarea(
        :active="active",
        :style="textStyle",
        :defaultValue="item.value",
        :class="$style.textarea",
        @change="handleChangeValue",
        spellcheck="false"
      )
</template>
<style module>
  textarea.textarea {
    width: 100%;
    height: 100%;
    background-color: transparent;
    border: none;
    resize: none;
    cursor: pointer;
    &:focus {
      border: none;
      box-shadow: none;
    }
    @nest [active] & {
      cursor: text;
    }
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
