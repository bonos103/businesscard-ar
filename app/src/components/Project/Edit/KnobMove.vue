<template lang="pug">
  div(
    :class="$style.knob",
    :position="position",
    @touchstart.prevent="handleStart",
    @mousedown.prevent="handleStart",
  )
</template>
<style module>
  .knob {
    position: absolute;
    background-color: transparent;
    cursor: move;
    &[position="top"],
    &[position="bottom"] {
      left: 0;
      width: 100%;
      height: 9px;
    }
    &[position="right"],
    &[position="left"] {
      top: 0;
      width: 9px;
      height: 100%;
    }
    &[position="top"] {
      top: -5px;
    }
    &[position="bottom"] {
      bottom: -5px;
    }
    &[position="right"] {
      right: -5px;
    }
    &[position="left"] {
      left: -5px;
    }
  }
</style>
<script>
import TouchEvent from '@/utils/TouchEvent'

export default {
  props: {
    position: { type: String },
  },
  data() {
    return {
      touchEvent: undefined,
    }
  },
  methods: {
    handleStart(e) {
      this.active = true
      this.touchEvent = new TouchEvent()
      this.touchEvent.start(e)
      this.touchEvent.onmousemove = this.handleMove
    },
    handleMove() {
      const { x, y } = this.touchEvent.diff
      this.$emit('change', { dx: x, dy: y, move: true })
    },
  },
}
</script>
