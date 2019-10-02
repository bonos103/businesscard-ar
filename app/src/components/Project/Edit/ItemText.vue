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
      div(:class="$style.moveKnob", position="top")
      div(:class="$style.moveKnob", position="right")
      div(:class="$style.moveKnob", position="bottom")
      div(:class="$style.moveKnob", position="left")
      div(:class="$style.knob", position="top-left")
      div(:class="$style.knob", position="top-center")
      div(:class="$style.knob", position="top-right")
      div(:class="$style.knob", position="center-left")
      div(:class="$style.knob", position="center-right")
      div(:class="$style.knob", position="bottom-left")
      div(:class="$style.knob", position="bottom-center")
      div(:class="$style.knob", position="bottom-right")
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
  .moveKnob {
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

export default {
  mixins: [EventListener],
  props: {
    active: { type: Boolean, default: true },
    item: { type: Object },
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
  },
}
</script>
