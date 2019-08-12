<template lang="pug">
  div(:class="$style.wrapper")
    layout-content(:class="$style.main")
      text-heading {{title}}
      div
        a-textarea(
          v-model="value",
          :autosize="{ minRows: 4, maxRows: 6 }"
        )
      div
        qr-code(:text="text")
      div(v-if="isShow")
        div(
          style="width: 100%; height: 100%; position: fixed; left: 0; top: 0; z-index: -1; overflow: hidden;"
        )
          vr-object(:text="value")
      //- img(:src="src" v-if="src")
    div(:class="$style.vr")
      iframe(width="100%", height="100%", :src="`https://localhost:8080/vr?text=${text}`", allowfullscreen="yes", allowvr="yes", scrolling="no", :class="$style.iframe")
</template>
<style module>
  .wrapper {
    width: 100%;
    @media (--md) {
      display: flex;
    }
  }
  .main {
    flex: 1 1 66.66%;
    @media (--md) {
      flex: 1 1 60%
    }
    @media (--lg) {
      flex: 1 1 50%;
    }
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
    min-height: 50vh;
    border: 0;
  }
</style>
<script>
import LayoutContent from '@/components/Layout/Content.vue'
import TextHeading from '@/components/Text/Heading.vue'
import QrCode from '@/components/QrCode/index.vue'
import VrObject from '@/components/Vr/Object.vue'
import Object2Canvas from '@/utils/Object2Canvas'

export default {
  name: 'home',
  components: {
    LayoutContent,
    TextHeading,
    QrCode,
    VrObject,
  },
  data() {
    const defaultValue = 'Autosize height with\n\n minimum and maximum number of lines Autosize height\n with minimum and maximum number of lines'
    return {
      src: null,
      title: 'HOME',
      text: defaultValue,
      value: defaultValue,
      timer: null,
      isShow: false,
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
      }, 1000)
    },
  },
  methods: {
    async reloadQRCode(value) {
      this.text = value
    },
    async reloadObject() {
      const canvas = await new Object2Canvas(document.querySelector('#target1')).canvas()
      this.src = canvas.toDataURL('image/png')
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
