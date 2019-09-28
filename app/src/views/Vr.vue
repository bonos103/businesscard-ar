<template lang="pug">
  div(:class="$style.wrapper")
    Object(ref="material", :text="text")
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
import VrScene from '@/components/Vr/VrScene2.vue'
import Object from '@/components/Vr/Object.vue'
import router from '@/router'

export default {
  name: 'Vr',
  components: {
    Object,
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
    new Vue({
      router,
      render: h => h(VrScene, {
        props: {
          node: this.$refs.material.$el,
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
