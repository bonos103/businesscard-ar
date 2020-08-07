<template lang="pug">
  div(:class="$style.wrap", v-if="project")
    div(:class="$style.canvas", ref="canvas", id="editBody")
      div(:class="$style.canvasInner")
        div(:class="$style.card")
          img(src="@/assets/images/project/qr.png")
        component(
          v-for="(item, index) in project.items",
          :key="index",
          :is="item.type | itemComponent",
          :item="item",
          :active="item.eid === selectItemEid",
          @activate="activateItem($event, item)",
          @deactivate="deactivateItem($event, item)",
          @change="handleChange",
        )
    div(:class="$style.tool")
      edit-tool
    a-tooltip(placement="topRight", arrowPointAtCenter)
      span(slot="title") QRコードをダウンロード
      div(:class="$style.download", @click="handleDownload")
        download-icon
</template>
<style module>
  .canvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    &::-webkit-scrollbar {
      display: none!important;
    }
  }
  .canvasInner {
    position: relative;
    border: 10000px solid transparent;
    background-image: url('@/assets/images/project/background.jpg');
    background-size: 567px 438px;
    background-repeat: repeat;
  }
  .card {
    position: absolute;
    top: 0;
    left: 0;
    background-color: #fff;
    width: 120px;
    height: 120px;
    transform: translate(-50%, -50%);
    & img {
      width: 100%;
      height: auto;
    }
  }
  .tool {
    position: fixed;
    left: 30px;
    bottom: 30px;
  }
  .download {
    position: fixed;
    right: 30px;
    bottom: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: color-mod(#fff a(90%));
    cursor: pointer;
    & svg {
      width: 20px;
      height: 20px;
    }
  }
</style>
<script>
import { mapState, mapActions } from 'vuex'
import { SELECT_ITEM_EID, SET_DATA } from '@/store/modules/projects/types'
import DownloadIcon from '@/components/Icon/DownloadIcon.vue'
import EditTool from '@/components/Project/Edit/Tool.vue'
import ItemSocial from '@/components/Project/Edit/ItemSocial.vue'
import ItemText from '@/components/Project/Edit/ItemText.vue'
import EventListener from '@/utils/mixins/EventListener'
import MarkerPattern from '@/utils/MarkerPattern'

export default {
  mixins: [EventListener],
  components: {
    DownloadIcon,
    EditTool,
    ItemSocial,
    ItemText,
  },
  data() {
    return {
      activeItem: [],
      resizeTimer: null,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      SITE_URL: process.env.VUE_APP_URL,
    }
  },
  computed: {
    ...mapState('projects', {
      project: 'project',
      selectItemEid: 'selectItemEid',
    }),
  },
  filters: {
    itemComponent(type) {
      if (type === 'social') {
        return 'ItemSocial'
      }
      return 'ItemText'
    },
  },
  mounted() {
    this.init()
  },
  methods: {
    ...mapActions('projects', {
      SELECT_ITEM_EID,
      SET_DATA,
    }),
    init() {
      const h = window.innerHeight
      const w = window.innerWidth
      this.$refs.canvas.scrollTo(10000 - (w / 2), 10000 - (h / 2))
      this.$listen(window, 'resize', this.resizeEvent)
    },
    activateItem(e, item) {
      this.activeItem = [item]
      this.SELECT_ITEM_EID(item.id)
    },
    deactivateItem() {
      this.activeItem = []
      this.SELECT_ITEM_EID()
    },
    handleChange(data) {
      this.SET_DATA(data)
    },
    resizeEvent() {
      clearTimeout(this.resizeTimer)
      this.resizeTimer = setTimeout(() => {
        const $canvas = this.$refs.canvas
        const dx = window.innerWidth - this.windowWidth
        const dy = window.innerHeight - this.windowHeight
        this.windowWidth = window.innerWidth
        this.windowHeight = window.innerHeight
        $canvas.scrollTo($canvas.scrollLeft - (dx / 2), $canvas.scrollTop - (dy / 2))
      }, 1000 / 60)
    },
    async handleDownload() {
      const { uid } = this.project
      if (!uid) {
        return
      }
      const { href } = this.$router.resolve({ name: 'ArShow', params: { uid } })
      const link = new URL(href, this.SITE_URL)
      const markerPattern = new MarkerPattern(link.href)
      const base64 = await markerPattern.markerImage
      const binary = atob(base64.replace(/^.*,/, ''))
      const buffer = new Uint8Array(binary.length)
      for (let i = 0; i < binary.length; i += 1) {
        buffer[i] = binary.charCodeAt(i)
      }
      const blob = new Blob([buffer.buffer], {
        type: 'image/png',
      })
      window.open(URL.createObjectURL(blob))
    },
  },
}
</script>
