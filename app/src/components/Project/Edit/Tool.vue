<template lang="pug">
  div(:class="$style.block")
    a-tooltip(placement="topLeft", arrowPointAtCenter, :mouseLeaveDelay="0")
      span(slot="title") テキストを配置します
      div(:class="$style.item", @click="addItemText")
        text-icon
    div(:class="$style.item", @click.stop="socialExpand = true")
      a-tooltip(placement="topLeft", arrowPointAtCenter, :mouseLeaveDelay="0")
        span(slot="title") ソーシャルアイコンを配置します
        div(:class="$style.iconBlock")
          social-icon
      tool-social(
        :class="$style.socialList",
        @close="socialExpand = false",
        v-if="socialExpand",
      )
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
    position: relative;
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
  .iconBlock {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
  .socialList {
    position: absolute;
    top: 7px;
    left: 100%;
    margin-left: 10px;
  }
</style>
<script>
import { mapActions } from 'vuex'
import { ADD_ITEM } from '@/store/modules/projects/types'
import SocialIcon from '@/components/Icon/SocialIcon.vue'
import TextIcon from '@/components/Icon/TextIcon.vue'
import ToolSocial from '@/components/Project/Edit/ToolSocial.vue'

export default {
  components: {
    SocialIcon,
    TextIcon,
    ToolSocial,
  },
  data() {
    return {
      socialExpand: false,
    }
  },
  methods: {
    ...mapActions('projects', {
      ADD_ITEM,
    }),
    addItemText() {
      this.ADD_ITEM({ type: 'text' })
    },
  },
}
</script>
