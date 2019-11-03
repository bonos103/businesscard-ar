<template lang="pug">
  div
    div(:class="$style.list")
      div(:class="$style.listInner")
        div(:class="$style.item", v-for="project in projects", :key="project.id")
          router-link(:to="{ name: 'ProjectEdit', params: { id: project.id } }", v-if="project.id")
            project-card(:project="project")
        div(:class="$style.item")
          router-link(:to="{ name: 'ProjectNew' }")
            project-card-add

</template>
<style module>
  .list {
    padding: 40px 30px;
    overflow: hidden;
  }
  .listInner {
    display: flex;
    flex-wrap: wrap;
    margin-left: -2%;
    margin-right: -2%;
  }
  .item {
    flex: 0 1 calc(300px + 4%);
    padding-left: 2%;
    padding-right: 2%;
    padding-bottom: 2%;
  }
</style>
<script>
import { mapActions, mapState } from 'vuex'
import { GET_PROJECTS } from '@/store/modules/projects/types'
import ProjectCard from '@/components/Project/Card.vue'
import ProjectCardAdd from '@/components/Project/CardAdd.vue'

export default {
  components: {
    ProjectCard,
    ProjectCardAdd,
  },
  computed: {
    ...mapState('projects', {
      projects: 'projects',
    }),
  },
  mounted() {
    this.GET_PROJECTS()
  },
  methods: {
    ...mapActions('projects', {
      GET_PROJECTS,
    }),
  },
}
</script>
