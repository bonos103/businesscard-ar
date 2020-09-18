<template lang="pug">
  div(:class="$style.list")
    img(
      src="@/assets/images/project/sns/twitter.png",
      :class="$style.item",
      @click.prevent.stop="handleClick('twitter')",
    )
    img(
      src="@/assets/images/project/sns/facebook.png",
      :class="$style.item",
      @click.prevent.stop="handleClick('facebook')",
    )
    img(
      src="@/assets/images/project/sns/instagram.png",
      :class="$style.item",
      @click.prevent.stop="handleClick('instagram')",
    )
    img(
      src="@/assets/images/project/sns/web.png",
      :class="$style.item",
      @click.prevent.stop="handleClick('web')",
    )
</template>
<style module>
  .list {
    display: flex;
    align-items: center;
  }
  .item {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    margin-left: 1px;
    margin-right: 10px;
  }
</style>
<script>
import { mapActions } from 'vuex'
import { ADD_ITEM } from '@/store/modules/projects/types'
import EventListener from '@/utils/mixins/EventListener'

export default {
  mixins: [EventListener],
  mounted() {
    this.$listen(window, 'click', this.handleExpand)
  },
  methods: {
    ...mapActions('projects', {
      ADD_ITEM,
    }),
    handleExpand(e) {
      if (!this.$el.contains(e.target)) {
        this.$emit('close')
      }
    },
    handleClick(value) {
      this.ADD_ITEM({ type: 'social', value })
      this.$emit('close')
    },
  },
}
</script>
