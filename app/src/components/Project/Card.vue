<template lang="pug">
  div(:class="$style.card")
    div(:class="$style.image")
      img(:src="project.image.fullPath", v-if="project.image")
    div(:class="$style.title") {{project.title}}
</template>
<style module>
  .card {
    width: 100%;
    max-width: 300px;
    cursor: pointer;
  }
  .image {
    position: relative;
    vertical-align: top;
    width: 100%;
    background-color: var(--gray-lighter);
    border-radius: 10px;
    &::before {
      display: inline-block;
      content: '';
      width: 0;
      padding-top: 100%;
    }
    & img {
      width: 100%;
      height: 100%;
      vertical-align: top;
      border-radius: 10px;
    }
  }
  .title {
    font-size: 1.6rem;
    color: var(--black);
  }
</style>
<script>
export default {
  props: {
    project: {
      type: Object,
      required: true,
    },
  },
}
</script>
