<template lang="pug">
  span
    knob-move(position="top", @change="handleKnobMove")
    knob-move(position="right", @change="handleKnobMove")
    knob-move(position="bottom", @change="handleKnobMove")
    knob-move(position="left", @change="handleKnobMove")
    knob-size(position="top-left", @change="handleKnobSize")
    knob-size(position="top-center", @change="handleKnobSize")
    knob-size(position="top-right", @change="handleKnobSize")
    knob-size(position="center-left", @change="handleKnobSize")
    knob-size(position="center-right", @change="handleKnobSize")
    knob-size(position="bottom-left", @change="handleKnobSize")
    knob-size(position="bottom-center", @change="handleKnobSize")
    knob-size(position="bottom-right", @change="handleKnobSize")
</template>
<script>
import EventListener from '@/utils/mixins/EventListener'
import KnobMove from '@/components/Project/Edit/KnobMove.vue'
import KnobSize from '@/components/Project/Edit/KnobSize.vue'

export default {
  mixins: [EventListener],
  components: {
    KnobMove,
    KnobSize,
  },
  mounted() {
    const self = this
    const $target = document.querySelector('#editBody') || window
    this.$listen($target, 'click', (e) => {
      if (!self.$el.contains(e.target)) {
        self.deactivate()
      }
    })
  },
  methods: {
    deactivate() {
      this.$emit('deactivate')
    },
    handleKnobSize(data) {
      this.$emit('changeKnobSize', data)
    },
    handleKnobMove(data) {
      this.$emit('changeKnobMove', data)
    },
  },
}
</script>
