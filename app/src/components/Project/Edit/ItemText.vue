<template lang="pug">
  div(:class="$style.item", :style="boxStyle", :active="active", ref="item")
    a-textarea(
      :style="textStyle",
      :defaultValue="item.value",
      :class="$style.textarea",
      @change="handleChangeValue",
      spellcheck="false"
    )
    span(v-if="active")
      knob-move(position="top")
      knob-move(position="right")
      knob-move(position="bottom")
      knob-move(position="left")
      knob-size(position="top-left", @change="handleKnobSize")
      knob-size(position="top-center")
      knob-size(position="top-right")
      knob-size(position="center-left")
      knob-size(position="center-right")
      knob-size(position="bottom-left")
      knob-size(position="bottom-center")
      knob-size(position="bottom-right")
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
    @nest .item[active] & {
      cursor: text;
    }
  }
</style>
<script>
import EventListener from '@/utils/mixins/EventListener'
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
    this.$listen(this.$parent.$el, 'click', (e) => {
      if (self.$el.contains(e.target)) {
        self.$emit('activate')
      } else {
        self.$emit('deactivate')
      }
    })
  },
  methods: {
    handleChangeValue(e) {
      this.$emit('change', { value: e.target.value || '' })
    },
    handleKnobSize(data) {
      console.log(data)
    },
  },
}
</script>
