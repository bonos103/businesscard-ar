<template lang="pug">
  span
    knob-move(position="top", @change="handleKnobMove", @end="handleEnd")
    knob-move(position="right", @change="handleKnobMove", @end="handleEnd")
    knob-move(position="bottom", @change="handleKnobMove", @end="handleEnd")
    knob-move(position="left", @change="handleKnobMove", @end="handleEnd")
    knob-move(position="whole", @change="handleKnobMove", v-if="isWholeMove", @end="handleEnd")
    knob-size(position="top-left", @change="handleKnobSize", @end="handleEnd")
    knob-size(position="top-center", @change="handleKnobSize", @end="handleEnd")
    knob-size(position="top-right", @change="handleKnobSize", @end="handleEnd")
    knob-size(position="center-left", @change="handleKnobSize", @end="handleEnd")
    knob-size(position="center-right", @change="handleKnobSize", @end="handleEnd")
    knob-size(position="bottom-left", @change="handleKnobSize", @end="handleEnd")
    knob-size(position="bottom-center", @change="handleKnobSize", @end="handleEnd")
    knob-size(position="bottom-right", @change="handleKnobSize", @end="handleEnd")
</template>
<script>
import EventListener from '@/utils/mixins/EventListener'
import KnobMove from '@/components/Project/Edit/KnobMove.vue'
import KnobSize from '@/components/Project/Edit/KnobSize.vue'

export default {
  mixins: [EventListener],
  props: {
    option: {
      type: Object,
      default() {
        return {
          fixedRatio: false,
          wholeMove: false,
        }
      },
    },
  },
  components: {
    KnobMove,
    KnobSize,
  },
  computed: {
    isWholeMove() {
      return this.option.wholeMove
    },
    isFixedRatio() {
      return this.option.fixedRatio
    },
  },
  data() {
    return {
      moving: false,
    }
  },
  mounted() {
    const self = this
    const $target = document.querySelector('#editBody') || window
    this.$listen($target, 'click', (e) => {
      if (!self.$el.contains(e.target) && !this.moving) {
        self.deactivate()
      }
    })
  },
  methods: {
    deactivate() {
      this.$emit('deactivate')
    },
    handleKnobSize(data) {
      this.moving = true
      if (this.isFixedRatio) {
        if (data.dx * data.dy > 0) {
          if (data.dx > data.dy) {
            data.dy = data.dx
          } else {
            data.dx = data.dy
          }
        } else if (data.dx > data.dy) {
          data.dx = data.dy
        } else {
          data.dy = data.dx
        }
      }
      this.$emit('changeKnobSize', data)
    },
    handleKnobMove(data) {
      this.moving = true
      this.$emit('changeKnobMove', data)
    },
    handleEnd() {
      // knobの外にカーソルがあるときに終了してもdeactivateが動かないようにする
      // setTimeoutしないと、先にmoving = falseになってしまう
      setTimeout(() => {
        this.moving = false
      }, 10)
    },
  },
}
</script>
