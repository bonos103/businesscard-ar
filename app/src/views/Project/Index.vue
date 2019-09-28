<template lang="pug">
  div
    div(:class="$style.list")
      div(:class="$style.listInner")
        div(:class="$style.item")
          router-link(to="#")
            project-card
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
    margin-left: -2%;
    margin-right: -2%;
  }
  .item {
    flex: 0 1 calc(300px + 4%);
    padding-left: 2%;
    padding-right: 2%;
  }
</style>
<script>
import ProjectCard from '@/components/Project/Card.vue'
import ProjectCardAdd from '@/components/Project/CardAdd.vue'

export default {
  components: {
    ProjectCard,
    ProjectCardAdd,
  },
}
</script>
