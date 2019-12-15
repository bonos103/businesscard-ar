<template lang="pug">
  div(:class="$style.wrap")
    div(:class="$style.header")
      div(:class="$style.headerLeft")
        h1(:class="$style.logo")
          router-link(:to="{ name: 'Project' }")
            logo-simple-icon
        div(:class="$style.title")
          a-input(type="text", placeholder="プロジェクト名", :value="title", @input="changeTitle")
      div(:class="$style.headerRight")
        div(:class="$style.item")
          div(@click="isPreviewModal = true") プレビュー
          preview-modal(v-model="isPreviewModal", :id="$route.params.id", v-if="isPreviewModal")
        //- div(:class="$style.item")
          minus-icon
          div(:class="$style.zoomLabel") 100%
          plus-icon
        button(:class="$style.button", @click="handleSave") 保存
    div(:class="$style.toolHeader", v-if="item")
      div(:class="$style.headerRight", v-if="item.type === 'text'")
        div(:class="$style.toolHeaderItem")
          label サイズ
          a-dropdown(v-model="visibleToolSize")
            div(:class="$style.toolSize")
              | {{item.font_size}}
            div(:class="$style.toolSizeSelect", slot="overlay")
              div(
                :class="$style.toolSizeSelectItem",
                @click="changeSize(10)",
                :active="item.font_size === 10"
              ) 10
              div(
                :class="$style.toolSizeSelectItem",
                @click="changeSize(11)",
                :active="item.font_size === 11"
              ) 11
              div(
                :class="$style.toolSizeSelectItem",
                @click="changeSize(12)",
                :active="item.font_size === 12"
              ) 12
              div(
                :class="$style.toolSizeSelectItem",
                @click="changeSize(14)",
                :active="item.font_size === 14"
              ) 14
              div(
                :class="$style.toolSizeSelectItem",
                @click="changeSize(16)",
                :active="item.font_size === 16"
              ) 16
              div(
                :class="$style.toolSizeSelectItem",
                @click="changeSize(18)",
                :active="item.font_size === 18"
              ) 18
              div(
                :class="$style.toolSizeSelectItem",
                @click="changeSize(20)",
                :active="item.font_size === 20"
              ) 20
              div(
                :class="$style.toolSizeSelectItem",
                @click="changeSize(24)",
                :active="item.font_size === 24",
                ) 24
              div(
                :class="$style.toolSizeSelectItem",
                @click="changeSize(28)",
                :active="item.font_size === 28",
              ) 28
              div(
                :class="$style.toolSizeSelectItem",
                @click="changeSize(32)",
                :active="item.font_size === 32",
              ) 32
              div(
                :class="$style.toolSizeSelectItem",
                @click="changeSize(40)",
                :active="item.font_size === 40",
              ) 40

        div(:class="$style.toolHeaderItem")
          label カラー
          a-dropdown(v-model="visibleToolColor", placement="bottomRight")
            div(:class="$style.toolColor", :style="{ backgroundColor: item.color }")
            sketch-picker(
              slot="overlay",
              :value="item.color",
              @input="changeColor"
            )

      div(:class="$style.headerRight", v-if="item.type === 'social'")
        div(:class="$style.toolHeaderItem")
          label リンク
          a-input(
            type="text",
            placeholder="ユーザーID",
            :value="item.value",
            @input="changeValue",
            style="width: 280px;",
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
    height: 100%;
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
  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
    color: #fff;
    height: 100%;
    background-color: var(--black);
    border: 1px solid var(--black);
    padding-left: 1em;
    padding-right: 1em;
    margin-left: 10px;
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
      flex: 0 0 auto;
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
import { mapActions, mapGetters, mapState } from 'vuex'
import { notification } from 'ant-design-vue'
import SketchPicker from 'vue-color/src/components/Sketch.vue'
import {
  POST_PROJECT,
  PUT_PROJECT,
  SET_DATA,
  SET_TITLE,
} from '@/store/modules/projects/types'
import LogoSimpleIcon from '@/components/Icon/LogoSimpleIcon.vue'
import MinusIcon from '@/components/Icon/MinusIcon.vue'
import PlusIcon from '@/components/Icon/PlusIcon.vue'
import PreviewModal from '@/components/QrCode/PreviewModal.vue'

export default {
  components: {
    LogoSimpleIcon,
    MinusIcon,
    PlusIcon,
    PreviewModal,
    SketchPicker,
  },
  computed: {
    ...mapState('projects', {
      title: state => state.project.title,
    }),
    ...mapGetters('projects', {
      item: 'selectItem',
    }),
  },
  data() {
    return {
      colors: '#000000',
      isPreviewModal: false,
      visibleToolSize: false,
      visibleToolColor: false,
    }
  },
  methods: {
    ...mapActions('projects', {
      POST_PROJECT,
      PUT_PROJECT,
      SET_DATA,
      SET_TITLE,
    }),
    changeTitle(e) {
      this.SET_TITLE(e.target.value)
    },
    changeSize(value) {
      this.SET_DATA({ font_size: value })
    },
    changeColor(colors) {
      this.SET_DATA({ color: colors.hex })
    },
    changeValue(e) {
      if (/^https:\/\/(www\.instagram\.com|www\.facebook\.com|twitter\.com)\//.test(e.target.value || '')) {
        this.SET_DATA({ value: e.target.value })
      }
    },
    async handleSave() {
      if (this.$route.name === 'ProjectNew') {
        const result = await this.POST_PROJECT().catch(() => {
          notification.error({ message: '作成できませんでした。' })
        })
        if (!result) {
          return
        }
        notification.success({ message: '新規作成しました。' })
        const { id } = result.data
        this.$router.push({ name: 'ProjectEdit', params: { id } })
      } else {
        const result = await this.PUT_PROJECT().catch(() => {
          notification.error({ message: '保存できませんでした。' })
        })
        if (!result) {
          return
        }
        console.log(result)
        notification.success({ message: '保存しました。' })
      }
    },
  },
}
</script>
