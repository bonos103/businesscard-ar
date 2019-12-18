<template lang="pug">
  div(:class="$style.wrapper")
    //- div(:class="$style.creative")
      layout-content(:class="$style.main")
        text-heading Try it out
        div(:class="$style.textarea")
          a-textarea(
            v-model="value",
          )
        //- div
          qr-code(:text="text")
        div
          a-button(
            type="primary",
            size="large",
            :class="$style.confirmButton",
            @click="isQrModal = true"
          )
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
    div(:class="$style.eyecatch")
      div
        h1
          | QRコードを設置するだけ。
          br
          | ARでちょっと楽しく。
        a-button(
          type="primary",
          size="large",
        ) オリジナルARを作成する(無料)

    div(:class="$style.section")
      //- div(:class="$style.sectionTitle") 使い方
      div(:class="$style.step")
        div(:class="$style.stepItem")
          img(:class="$style.stepImage", src="@/assets/images/top/step1.png")
          div 読み込む
        div(:class="$style.stepItem")
          img(:class="$style.stepImage", src="@/assets/images/top/step2.png")
          div かざす
        div(:class="$style.stepItem")
          img(:class="$style.stepImage", src="@/assets/images/top/step3.png")
          div 体験する
    //- div(:class="$style.registerButton")
      router-link(to="/signup")
        a-button(type="primary", size="large") オリジナルARを作成する(無料)
      br
      a-button(type="link", size="large") 登録済みの方
    div(:class="$style.section")
      div(:class="$style.sectionTitle") 試してみる？
      div(:class="$style.try")
        div(:class="$style.tryCode")
        div(:class="$style.trySection")
          div(:class="$style.tryLabel") スマホでQRコードを読み込んでください。
          div(:class="$style.tryText")
            | QRコードを読み込むとWebブラウザを開きます。
            br
            | ブラウザ上で起動したカメラをこちらのQRコードに向けてください。
</template>
<style module>
  .wrapper {
    width: 100%;
  }
  /* .creative {
    width: 100%;
    @media (--md) {
      display: flex;
    }
  }
  .main {
    flex: 1 1 66.66%;
    display: flex;
    flex-direction: column;
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
    flex: 1 1 auto;
    margin-bottom: 30px;
    & textarea {
      height: 100%;
      min-height: 10em;
    }
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
    @media (--md) {
      font-size: 2rem;
      height: 50px;
    }
  } */
  .eyecatch {
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding-top: 60px;
    padding-bottom: 60px;
    & h1 {
      font-size: 4.6rem;
      font-weight: bold;
      text-align: center;
      line-height: 1.75;
      margin-bottom: 1.5em;
    }
  }

  .section {
    padding-top: 20px;
    @media (--md) {
      padding-top: 40px;
    }
  }
  .sectionTitle {
    font-size: 2.4rem;
    font-weight: bold;
    text-align: center;
    padding-top: 1em;
    padding-bottom: 1em;
    @media (--md) {
      font-size: 3.2rem;
    }
  }
  .step {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    max-width: 1200px;
    padding-top: 10px;
    padding-bottom: 30px;
    margin-left: auto;
    margin-right: auto;
    @media (--md) {
      padding-top: 30px;
      padding-bottom: 60px;
    }
  }
  .stepItem {
    flex: 1 1 33.33%;
    font-size: 1.6rem;
    font-weight: bold;
    text-align: center;
    @media (--md) {
      font-size: 2.4rem;
    }
  }
  .stepImage {
    width: 100%;
    max-width: 180px;
    padding: 0 10%;
    margin-bottom: 20px;
    @media (--md) {
      max-width: 170px;
    }
  }
  .registerButton {
    text-align: center;
  }

  .try {
    display: flex;
    align-items: center;
  }
  .tryCode {
    flex: 0 0 150px;
    width: 150px;
    & img {
      width: 100%;
    }
  }
  .trySection {
    flex: 1 1 auto;
    padding-left: 5%;
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
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.reloadQRCode(this.value)
        this.reloadObject()
      }, 500)
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
      $image.setAttribute('position', `0 ${this.size.height / 2 + 0.5} 0`)
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
