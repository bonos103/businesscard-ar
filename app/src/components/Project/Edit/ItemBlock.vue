<template lang="pug">
  div(
    :class="$style.item",
    :style="boxStyle",
    :active="active",
    ref="item",
    @click.stop="activateItem",
  )
    slot(
      :textStyle="textStyle",
      :handleChangeValue="handleChangeValue",
    )
    item-knob(
      v-if="active",
      :option="knobOption",
      @deactivate="deactivateItem",
      @changeKnobSize="handleKnobSize",
      @changeKnobMove="handleKnobMove",
    )
    item-menu(
      v-if="active",
      :class="$style.menu"
    )
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
  .menu {
    position: absolute;
    right: 0;
    top: 0;
    transform: translate(0, -120%);
  }
</style>
<script>
import { mapActions } from 'vuex'
import { SELECT_ITEM_EID, SET_DATA } from '@/store/modules/projects/types'
import ItemBlockController from '@/utils/ItemBlockController'
import ItemKnob from '@/components/Project/Edit/ItemKnob.vue'
import ItemMenu from '@/components/Project/Edit/ItemMenu.vue'

export default {
  props: {
    active: { type: Boolean, default: true },
    item: { type: Object },
  },
  components: {
    ItemKnob,
    ItemMenu,
  },
  data() {
    return {
      controller: new ItemBlockController(),
    }
  },
  computed: {
    boxStyle() {
      return {
        top: `${this.item.z * 100}px`,
        left: `${this.item.x * 100}px`,
        width: `${this.item.width * 100}px`,
        height: `${this.item.height * 100}px`,
      }
    },
    textStyle() {
      return {
        fontSize: `${this.item.font_size}px`,
        color: this.item.color,
        padding: 0,
      }
    },
    knobOption() {
      if (this.item.type === 'social') {
        return {
          fixedRatio: true,
          wholeMove: true,
        }
      }
      return {
        fixedRatio: false,
        wholeMove: false,
      }
    },
  },
  mounted() {
    this.controller.item = this.item
  },
  methods: {
    ...mapActions('projects', {
      SELECT_ITEM_EID,
      SET_DATA,
    }),
    activateItem() {
      this.activeItem = [this.item]
      this.SELECT_ITEM_EID(this.item.eid)
    },
    deactivateItem() {
      this.activeItem = []
      this.SELECT_ITEM_EID()
    },
    handleChangeValue(e) {
      this.$emit('change:value', { value: e.target.value || '' })
    },
    handleKnobSize(data) {
      const result = this.controller.resize(data)
      this.SET_DATA(result)
    },
    handleKnobMove(data) {
      const result = this.controller.move(data)
      this.SET_DATA(result)
    },
  },
}
</script>
