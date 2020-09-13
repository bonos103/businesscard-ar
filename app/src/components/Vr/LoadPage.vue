<template lang="pug">
  div(:class="$style.wrapper")
    transition(name="load")
      div(:class="$style.block", v-if="visible")
</template>
<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: true,
    },
  },
}
</script>
<style lang="postcss" module>
  .block {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background-color: red;
    z-index: 2;
    overflow: hidden;
    transition: all 5s;
  }
  .wrapper {
    & :global {
      & .load-enter-active,
      & .load-leave-active {
        transition: opacity 0.8s;
      }
      & .load-enter,
      & .load-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
      }
    }
  }
</style>
