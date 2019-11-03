<template lang="pug">
  div
    project-edit-header(:class="$style.header")
    project-edit-body(:class="$style.body")
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
  },
  methods: {
    ...mapActions('projects', {
      GET_PROJECT,
    }),
  },
}
</script>
