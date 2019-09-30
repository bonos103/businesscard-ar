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
    &[active] {
      border-color: var(--cyan);
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
    }
    &[position='top-center'] {
      top: -5px;
      left: calc(50% - 5px);
    }
    &[position='top-right'] {
      top: -5px;
      right: -5px;
    }
    &[position='center-left'] {
      top: calc(50% - 5px);
      left: -5px;
    }
    &[position='center-right'] {
      top: calc(50% - 5px);
      right: -5px;
    }
    &[position='bottom-left'] {
      bottom: -5px;
      left: -5px;
    }
    &[position='bottom-center'] {
      bottom: -5px;
      left: calc(50% - 5px);
    }
    &[position='bottom-right'] {
      bottom: -5px;
      right: -5px;
    }
  }
  textarea.textarea {
    width: 100%;
    height: 100%;
    background-color: transparent;
    border: none;
    resize: none;
    &:focus {
      border: none;
      box-shadow: none;
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
      console.log(self.$el.contains(e.target))
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
