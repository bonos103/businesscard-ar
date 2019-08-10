<template lang="pug">
  Material
</template>
<script>
import Vue from 'vue'
import Test from '@/components/Vr/Test.vue'
import Material from '@/components/Vr/Material.vue'
import router from '@/router'

export default {
  name: 'Vr',
  components: {
    Material,
    Test,
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
  },
  beforeMount() {
    const el = document.body.appendChild(document.createElement('div'))
    new Vue({
      router,
      render: h => h(Test),
    }).$mount(el)
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
