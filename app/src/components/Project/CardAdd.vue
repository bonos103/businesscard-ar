<template lang="pug">
  div(:class="$style.card")
    div(:class="$style.image")
      plus-icon
</template>
<style module>
  .card {
    width: 100%;
    max-width: 300px;
    cursor: pointer;
  }
  .image {
    position: relative;
    font-size: 7rem;
    color: var(--gray-lighter);
    text-align: center;
    vertical-align: middle;
    width: 100%;
    background-color: var(--gray-lightest);
    border: 1px solid var(--gray-lighter);
    border-radius: 10px;
    &::before {
      display: inline-block;
      content: '';
      width: 0;
      padding-top: 100%;
    }
  }
  .title {
    font-size: 1.6rem;
  }
</style>
<script>
import PlusIcon from '@/components/Icon/PlusIcon.vue'

export default {
  components: {
    PlusIcon,
  },
}
</script>
