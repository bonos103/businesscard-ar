<template lang="pug">
  div(:class="$style.item", :style="boxStyle", :active="active", ref="item")
    slot(
      :textStyle="textStyle",
      :handleChangeValue="handleChangeValue",
    )
    span(v-if="active")
      knob-move(position="top")
      knob-move(position="right")
      knob-move(position="bottom")
      knob-move(position="left")
      knob-size(position="top-left", @change="handleKnobSize")
      knob-size(position="top-center", @change="handleKnobSize")
      knob-size(position="top-right", @change="handleKnobSize")
      knob-size(position="center-left", @change="handleKnobSize")
      knob-size(position="center-right", @change="handleKnobSize")
      knob-size(position="bottom-left", @change="handleKnobSize")
      knob-size(position="bottom-center", @change="handleKnobSize")
      knob-size(position="bottom-right", @change="handleKnobSize")
</template>
<style module>
  .item {
    position: absolute;
    top: 0;
    left: 0;
    border: 1px dashed transparent;
    transform: translate(-50%, -50%);
    cursor: pointer;
    &[active] {
      border-color: var(--cyan);
      cursor: text;
    }
    &:hover:not([active]) {
      border: 1px solid var(--cyan);
    }
  }
</style>
<script>
import { mapActions } from 'vuex'
import { SELECT_ITEM_ID, SET_DATA } from '@/store/modules/projects/types'
import EventListener from '@/utils/mixins/EventListener'
import ItemBlockController from '@/utils/ItemBlockController'
import KnobMove from '@/components/Project/Edit/KnobMove.vue'
import KnobSize from '@/components/Project/Edit/KnobSize.vue'

export default {
  mixins: [EventListener],
  props: {
    active: { type: Boolean, default: true },
    item: { type: Object },
  },
  components: {
    KnobMove,
    KnobSize,
  },
  data() {
    return {
      controller: new ItemBlockController(),
    }
  },
  computed: {
    boxStyle() {
      return {
        top: `${this.item.y * 100 * -1}px`,
        left: `${this.item.x * 100}px`,
        width: `${this.item.width * 100}px`,
        height: `${this.item.height * 100}px`,
      }
    },
    textStyle() {
      return {
        fontSize: `${this.item.fontSize}px`,
        color: this.item.color,
      }
    },
  },
  mounted() {
    const self = this
    this.controller.item = this.item
    const $target = document.querySelector('#editBody') || window
    this.$listen($target, 'click', (e) => {
      if (self.$el.contains(e.target)) {
        self.activateItem()
      } else {
        self.deactivateItem()
      }
    })
  },
  methods: {
    ...mapActions('projects', {
      SELECT_ITEM_ID,
      SET_DATA,
    }),
    activateItem() {
      this.activeItem = [this.item]
      this.SELECT_ITEM_ID(this.item.id)
    },
    deactivateItem() {
      this.activeItem = []
      this.SELECT_ITEM_ID()
    },
    handleChangeValue(e) {
      this.$emit('change', { value: e.target.value || '' })
    },
    handleKnobSize(data) {
      const result = this.controller.resize(data)
      this.SET_DATA(result)
    },
  },
}
</script>
