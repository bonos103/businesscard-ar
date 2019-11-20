<template lang="pug">
  div(:class="$style.wrapper")
    Object(ref="material", :text="item.value", v-for="item in items", :key="item.eid")
</template>
<style module>
  .wrapper {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: -1;
    overflow: hidden;
  }
</style>
<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import VrScene from '@/components/Vr/VrScene2.vue'
import Object from '@/components/Vr/Object.vue'
import router from '@/router'

export default {
  name: 'ProjectPreview',
  components: {
    Object,
  },
  computed: {
    ...mapState('projects', {
      projects: 'projects',
    }),
    items() {
      if (this.projects && this.projects[0] && this.projects[0].items) {
        return this.projects[0].items
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
  mounted() {
    if (this.$route.query.text) {
      this.text = this.$route.query.text
    }
    const el = document.body.appendChild(document.createElement('div'))
    console.log('hoge')
    const objects = this.items.map((item, index) => ({
      ...item,
      node: this.$refs.material[index].$el,
    }))
    console.log(objects)
    new Vue({
      router,
      render: h => h(VrScene, {
        props: {
          objects,
        },
      }),
    }).$mount(el)
  },
  beforeMount() {
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
