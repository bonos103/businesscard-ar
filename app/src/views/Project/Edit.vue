<template lang="pug">
  div
    project-edit-header(:class="$style.header")
    project-edit-body(:class="$style.body", ref="body")
</template>
<style module>
  .header {
    position: relative;
    z-index: 2;
  }
  .body {
    z-index: 1;
  }
</style>
<script>
import { mapActions } from 'vuex'
import html2canvas from 'html2canvas'
import { GET_PROJECT } from '@/store/modules/projects/types'
import ProjectEditHeader from '@/components/Project/Edit/Header.vue'
import ProjectEditBody from '@/components/Project/Edit/Body.vue'

export default {
  components: {
    ProjectEditHeader,
    ProjectEditBody,
  },
  async mounted() {
    const { id } = this.$route.params
    await this.GET_PROJECT(id)
    console.log(this.$refs.body.$el)
    // const scrollX = (600 - window.innerWidth) / 2
    // const scrollY = (400 - window.innerHeight) / 2
    const textareas = Array.from(this.$refs.body.$refs.canvas.querySelectorAll('textarea'))
    textareas.forEach((elm) => {
      elm.style.height = `${elm.offsetHeight}px`
      elm.style['word-break'] = 'break-all'
    })
    html2canvas(this.$refs.body.$refs.canvas, {
      // width: 600,
      // height: 400,
      // scrollX,
      // scrollY,
    }).then(canvas => document.body.append(canvas))
  },
  methods: {
    ...mapActions('projects', {
      GET_PROJECT,
    }),
  },
}
</script>
