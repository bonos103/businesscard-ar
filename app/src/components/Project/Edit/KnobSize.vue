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
    width: 9px;
    height: 9px;
    background-color: #fff;
    border: 1px solid var(--cyan);
    border-radius: 2px;
    &[position='top-left'] {
      top: -5px;
      left: -5px;
      cursor: nwse-resize;
    }
    &[position='top-center'] {
      top: -5px;
      left: calc(50% - 5px);
      cursor: row-resize;
    }
    &[position='top-right'] {
      top: -5px;
      right: -5px;
      cursor: nesw-resize;
    }
    &[position='center-left'] {
      top: calc(50% - 5px);
      left: -5px;
      cursor: col-resize;
    }
    &[position='center-right'] {
      top: calc(50% - 5px);
      right: -5px;
      cursor: col-resize;
    }
    &[position='bottom-left'] {
      bottom: -5px;
      left: -5px;
      cursor: nesw-resize;
    }
    &[position='bottom-center'] {
      bottom: -5px;
      left: calc(50% - 5px);
      cursor: row-resize;
    }
    &[position='bottom-right'] {
      bottom: -5px;
      right: -5px;
      cursor: nwse-resize;
    }
  }
</style>
<script>
import EventListener from '@/utils/mixins/EventListener'
import TouchEvent from '@/utils/TouchEvent'

export default {
  mixins: [EventListener],
  props: {
    position: { type: String },
  },
  data() {
    return {
      active: false,
      touchEvent: undefined,
      dx: 0,
      dy: 0,
    }
  },
  methods: {
    handleStart(e) {
      this.active = true
      this.touchEvent = new TouchEvent()
      this.touchEvent.start(e)
      this.touchEvent.onmousemove = this.handleMove
    },
    handleMove(e) {
      // console.log(e, 'move')
      const { x, y } = this.touchEvent.diff
      this.$emit('change', { dx: x, dy: y, position: this.position })
    },
  },
}
</script>
