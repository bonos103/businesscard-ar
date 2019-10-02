<template lang="pug">
  div(:class="$style.wrap")
    div(:class="$style.header")
      div(:class="$style.headerLeft")
        h1(:class="$style.logo")
          logo-simple-icon
        div(:class="$style.title")
          a-input(type="text", placeholder="プロジェクト名" value="はじめてのAR名刺")
      div(:class="$style.headerRight")
        div(:class="$style.item")
          minus-icon
          div(:class="$style.zoomLabel") 100%
          plus-icon
    div(:class="$style.toolHeader", v-if="item")
      div(:class="$style.headerRight")
        div(:class="$style.toolHeaderItem")
          label サイズ
          a-dropdown(v-model="visibleToolSize")
            div(:class="$style.toolSize")
              | {{item.fontSize}}
            div(:class="$style.toolSizeSelect", slot="overlay")
              div(
                :class="$style.toolSizeSelectItem",
                @click="changeSize(10)",
                :active="item.fontSize === 10"
              ) 10
              div(
                :class="$style.toolSizeSelectItem",
                @click="changeSize(11)",
                :active="item.fontSize === 11"
              ) 11
              div(
                :class="$style.toolSizeSelectItem",
                @click="changeSize(12)",
                :active="item.fontSize === 12"
              ) 12
              div(
                :class="$style.toolSizeSelectItem",
                @click="changeSize(14)",
                :active="item.fontSize === 14"
              ) 14
              div(
                :class="$style.toolSizeSelectItem",
                @click="changeSize(16)",
                :active="item.fontSize === 16"
              ) 16
              div(
                :class="$style.toolSizeSelectItem",
                @click="changeSize(18)",
                :active="item.fontSize === 18"
              ) 18
              div(
                :class="$style.toolSizeSelectItem",
                @click="changeSize(20)",
                :active="item.fontSize === 20"
              ) 20
              div(
                :class="$style.toolSizeSelectItem",
                @click="changeSize(24)",
                :active="item.fontSize === 24",
                ) 24
              div(
                :class="$style.toolSizeSelectItem",
                @click="changeSize(28)",
                :active="item.fontSize === 28",
              ) 28
              div(
                :class="$style.toolSizeSelectItem",
                @click="changeSize(32)",
                :active="item.fontSize === 32",
              ) 32
              div(
                :class="$style.toolSizeSelectItem",
                @click="changeSize(40)",
                :active="item.fontSize === 40",
              ) 40

        div(:class="$style.toolHeaderItem")
          label カラー
          a-dropdown(v-model="visibleToolColor")
            div(:class="$style.toolColor", :style="{ backgroundColor: item.color }")
            sketch-picker(
              slot="overlay",
              :value="item.color",
              @input="changeColor"
            )
</template>
<style module>
  .wrap {
    background-color: color-mod(#fff a(90%));
    box-shadow: 0 0 10px color-mod(var(--black) a(10%));
  }
  .header,
  .toolHeader {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 40px;
    border-bottom: 1px solid var(--gray-lighter);
  }
  .headerLeft {
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 20px;
    @media (--md) {
      padding-left: 30px;
    }
  }
  .headerRight {
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .logo {
    color: var(--black);
    font-size: 2rem;
    margin-bottom: 0;
    margin-right: 5%;
  }
  .title {
    & input {
      font-size: 1.6rem;
      color: var(--black);
      &:not(:focus) {
        background-color: transparent;
        border: none;
      }
    }
  }
  .item {
    display: flex;
    align-items: center;
    font-size: 1.2rem;
    color: var(--gray-darker);
    & i {
      cursor: pointer;
    }
  }
  .zoomLabel {
    margin-left: 0.5em;
    margin-right: 0.5em;
    cursor: default;
  }
  .toolHeader {
    height: 60px;
  }
  .toolHeaderItem {
    display: flex;
    align-items: center;
    font-size: 1.4rem;
    color: var(--gray-darker);
    margin-right: 20px;
    & label {
      margin-right: 0.5em;
    }
  }
  .toolSize {
    position: relative;
    font-size: 1.8rem;
    font-weight: bold;
    color: var(--black);
    cursor: pointer;
  }
  .toolSizeSelect {
    position: absolute;
    top: 100%;
    left: 50%;
    background-color: color-mod(#fff a(90%));
    border-radius: 6px;
    transform: translate(-50%, 20px);
    overflow: hidden;
    &::before {
      content: '';
      position: absolute;
      top: -20px;
      left: 0;
      width: 100%;
      height: 20px;
    }
  }
  .toolSizeSelectItem {
    font-size: 1.4rem;
    font-weight: normal;
    padding: 0.5em 1em;
    &:hover {
      background-color: var(--gray-lighter);
    }
    &[active] {
      background-color: var(--gray-lighter);
    }
  }

  .toolColor {
    width: 28px;
    height: 28px;
    background-color: var(--coral);
    border: 1px solid var(--gray-lighter);
    border-radius: 15%;
    cursor: pointer;
  }
</style>
<script>
import { mapActions, mapGetters } from 'vuex'
import SketchPicker from 'vue-color/src/components/Sketch.vue'
import { SET_DATA } from '@/store/modules/projects/types'
import LogoSimpleIcon from '@/components/Icon/LogoSimpleIcon.vue'
import MinusIcon from '@/components/Icon/MinusIcon.vue'
import PlusIcon from '@/components/Icon/PlusIcon.vue'

export default {
  components: {
    LogoSimpleIcon,
    MinusIcon,
    PlusIcon,
    SketchPicker,
  },
  computed: {
    ...mapGetters('projects', {
      item: 'selectItem',
    }),
  },
  data() {
    return {
      colors: '#000000',
      visibleToolSize: false,
      visibleToolColor: false,
    }
  },
  methods: {
    ...mapActions('projects', {
      SET_DATA,
    }),
    changeSize(value) {
      this.SET_DATA({ fontSize: value })
    },
    changeColor(colors) {
      this.SET_DATA({ color: colors.hex })
    },
  },
}
</script>
