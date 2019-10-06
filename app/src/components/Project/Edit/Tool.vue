<template lang="pug">
  div(:class="$style.block")
    div(:class="$style.item", @click="addItemText")
      text-icon
    div(:class="$style.item")
      photo-icon
</template>
<style module>
  .block {
    background-color: color-mod(#fff a(90%));
    width: 50px;
    border-radius: 25px;
    text-align: center;
    padding: 2px;
  }
  .item {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    width: 46px;
    height: 46px;
    border-radius: 50%;
    margin-left: auto;
    margin-right: auto;
    cursor: pointer;
    & + .item {
      margin-top: 2px;
    }
  }
</style>
<script>
import { mapActions } from 'vuex'
import { ADD_ITEM } from '@/store/modules/projects/types'
import PhotoIcon from '@/components/Icon/PhotoIcon.vue'
import TextIcon from '@/components/Icon/TextIcon.vue'

export default {
  components: {
    PhotoIcon,
    TextIcon,
  },
  methods: {
    ...mapActions('projects', {
      ADD_ITEM,
    }),
    addItemText() {
      this.ADD_ITEM('text')
    },
  },
}
</script>
