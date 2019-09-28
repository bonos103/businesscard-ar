<template lang="pug">
  div(:class="$style.wrap")
    div(:class="$style.canvas", ref="canvas", @click="handlePoint")
      div(:class="$style.canvasInner")
        div(:class="$style.card")
          img(src="@/assets/images/project/qr.png")
        div(:class="$style.tool")
          edit-tool
        component(
          v-for="(item, index) in items",
          :key="index",
          is="ItemText",
          :item="item",
          :active="activeItem.includes(item)",
          @activate="activateItem($event, item)",
          @deactivate="deactivateItem($event, item)",
        )

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
</style>
<script>
import EditTool from '@/components/Project/Edit/Tool.vue'
import ItemText from '@/components/Project/Edit/ItemText.vue'

export default {
  components: {
    EditTool,
    ItemText,
  },
  data() {
    return {
      activeItem: [],
      items: [
        {
          type: 'text',
          value: 'hogehoge',
          scaleX: 1,
          scaleY: 1,
          scaleZ: 1,
          rotationX: 0,
          rotationY: 0,
          rotationZ: 0,
          x: 0,
          y: 1,
          z: 0,
          font: 18,
          color: '#000000',
          width: 3,
          height: 2,
        },
      ],
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const h = window.innerHeight
      const w = window.innerWidth
      this.$refs.canvas.scrollTo(10000 - (w / 2), 10000 - (h / 2))
    },
    handlePoint(e) {
      console.log(e)
    },
    activateItem(e, item) {
      this.activeItem = [item]
    },
    deactivateItem() {
      this.activeItem = []
    },
  },
}
</script>
