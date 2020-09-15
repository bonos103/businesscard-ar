<template lang="pug">
  div(:class="$style.wrapper")
    Object(ref="material", :item="item", v-for="item in items", :key="item.eid")
    div(:class="$style.hide")
</template>
<style module>
  .wrapper {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: -10000;
    overflow: hidden;
  }
  .hide {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--black);
  }
</style>
<script>
import Vue from 'vue'
import { mapActions, mapState } from 'vuex'
import { GET_PROJECT } from '@/store/modules/projects/types'
import ArScene from '@/components/Vr/ArScene3.vue'
// import ArScene from '@/components/Vr/VrScene2.vue'
import Object from '@/components/Vr/Object.vue'
import router from '@/router'
import Object2Canvas from '@/utils/Object2Canvas'
import SocialIcon from '@/utils/SocialIcon'

export default {
  name: 'ProjectPreview',
  components: {
    Object,
  },
  computed: {
    ...mapState('projects', {
      project: 'project',
    }),
    items() {
      if (this.project && this.project.items) {
        return this.project.items
      }
      return []
    },
  },
  data() {
    return {
      show: false,
      text: null,
    }
  },
  async mounted() {
    const { id } = this.$route.params
    await this.GET_PROJECT({ id, type: 'uid' })
    if (this.$route.query.text) {
      this.text = this.$route.query.text
    }
    const el = document.body.appendChild(document.createElement('div'))
    const promise = async (item, index) => {
      // const object2Canvas = new Object2Canvas(this.$refs.material[index].$el)
      // await object2Canvas.init()
      // const src = await object2Canvas.toDataURL('image/png')
      const src = await this.getItemSrc(item, index)
      return {
        ...item,
        src,
      }
    }
    const objects = await Promise.all(this.items.map(promise))
    console.log(objects)
    new Vue({
      router,
      render: h => h(ArScene, {
        props: {
          objects,
        },
      }),
    }).$mount(el)
  },
  beforeMount() {
  },
  methods: {
    ...mapActions('projects', {
      GET_PROJECT,
    }),
    async getItemSrc(item, index) {
      if (item.type === 'text') {
        const object2Canvas = new Object2Canvas(this.$refs.material[index].$el)
        await object2Canvas.init()
        const src = await object2Canvas.toDataURL('image/png')
        return src
      }
      if (item.type === 'social') {
        return (new SocialIcon(item.value)).src
      }
      return ''
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
