<template lang="pug">
  div(:class="$style.wrapper")
    div(:class="$style.creative")
      layout-content(:class="$style.main")
        //- text-heading {{title}}
        div(:class="$style.textarea")
          a-textarea(
            v-model="value",
            :autosize="{ minRows: 10, maxRows: 18 }"
          )
        //- div
          qr-code(:text="text")
        a-button(type="primary", size="large", :class="$style.confirmButton", @click="isQrModal = true")
          ar-icon(:custom-style="{ fontSize: '1.5em' }")
          | ARで確認する
        qr-code-confirm-modal(v-model="isQrModal", :text="value", v-if="isQrModal")
          p hoge
        //- img(:src="src" v-if="src")
      div(:class="$style.vr")
        iframe#iframe(width="100%", height="100%", :src="`https://localhost:8080/vr?text=.`", allowfullscreen="yes", allowvr="yes", scrolling="no", :class="$style.iframe")
      div(v-if="isShow")
        div(:class="$style.vrObject")
          vr-object(:text="value")
</template>
<style module>
  .wrapper {
    width: 100%;
  }
  .creative {
    width: 100%;
    @media (--md) {
      display: flex;
    }
  }
  .main {
    flex: 1 1 66.66%;
    padding-top: 20px;
    @media (--md) {
      flex: 1 1 60%;
    }
    @media (--lg) {
      flex: 1 1 50%;
      padding: 30px 30px 0;
    }
  }
  .textarea {
    margin-bottom: 30px;
  }
  .vrObject {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: -1;
    overflow: hidden;
  }
  .vr {
    flex: 1 1 33.33%;
    min-width: 320px;
    @media (--md) {
      flex: 1 1 40%;
    }
    @media (--lg) {
      flex: 1 1 50%;
    }
  }
  .iframe {
    min-height: 60vw;
    border: 0;
    @media (--md) {
      min-height: 30vw;
    }
    @media (--lg) {
      min-height: 40vw;
    }
    @media (--sm) {
      margin-top: 30px;
    }
  }
  .confirmButton {
    display: inline-flex;
    align-items: center;
  }
</style>
<script>
import ArIcon from '@/components/Icon/ArIcon.vue'
import LayoutContent from '@/components/Layout/Content.vue'
import TextHeading from '@/components/Text/Heading.vue'
import QrCode from '@/components/QrCode/index.vue'
import QrCodeConfirmModal from '@/components/QrCode/ConfirmModal.vue'
import VrObject from '@/components/Vr/Object.vue'
import Object2Canvas from '@/utils/Object2Canvas'

export default {
  name: 'home',
  components: {
    ArIcon,
    LayoutContent,
    TextHeading,
    QrCode,
    QrCodeConfirmModal,
    VrObject,
  },
  data() {
    const defaultValue = 'ここに\nARで表示したい文字を\n入力してください。'
    return {
      src: null,
      size: {
        width: 0,
        height: 0,
      },
      title: 'HOME',
      text: defaultValue,
      value: defaultValue,
      timer: null,
      isShow: false,
      isQrModal: false,
    }
  },
  mounted() {
    this.isShow = true
    this.$nextTick(() => {
      this.reloadObject()
    })
  },
  watch: {
    value(value) {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.reloadQRCode(value)
        this.reloadObject()
      }, 500)
    },
  },
  methods: {
    async reloadQRCode(value) {
      this.text = value
    },
    async reloadObject() {
      const object2Canvas = new Object2Canvas(document.querySelector('#target1'))
      await object2Canvas.init()
      this.src = await object2Canvas.toDataURL('image/png')
      this.size = await object2Canvas.aframeSize()
      this.updateIframe()
    },
    updateIframe() {
      const $iframe = document.querySelector('#iframe')
      const $image = $iframe.contentDocument.querySelector('#object')
      $image.setAttribute('src', this.src)
      $image.setAttribute('width', this.size.width)
      $image.setAttribute('height', this.size.height)
      $image.setAttribute('position', `0.55 ${(this.size.height / 2) + 0.1} -3.3`)
    },
  },
  metaInfo() {
    return {
      meta: [
        {
          vmid: 'viewport',
          name: 'viewport',
          content: 'width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0',
        },
      ],
    }
  },
}
</script>
