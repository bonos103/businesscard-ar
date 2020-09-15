<template lang="pug">
  div(:class="$style.wrapper")
    transition(name="load" appear)
      div(:class="$style.logoBlock", v-if="true")
        div(:class="$style.logo", :data-active="!visible")
          | powered by
          logo-icon
    transition(name="load")
      div(:class="$style.block", v-if="visible")
        loading-icon

</template>
<script>
import LoadingIcon from '@/components/Icon/LoadingIcon.vue'
import LogoIcon from '@/components/Icon/LogoIcon.vue'

export default {
  props: {
    visible: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    LoadingIcon,
    LogoIcon,
  },
}
</script>
<style lang="postcss" module>
  .block {
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 60px;
    width: 100%;
    height: 100%;
    background-color: var(--black);
    z-index: 2;
    overflow: hidden;
    & svg {
      stroke: #fff!important;
    }
  }
  .logoBlock {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 3;
  }
  .logo {
    position: absolute;
    bottom: 35%;
    right: 50%;
    display: inline-flex;
    align-items: flex-end;
    font-size: 1.8rem;
    color: var(--white);
    word-break: keep-all;
    white-space: pre;
    opacity: 1;
    transform: translateX(50%);
    transition:
      bottom 0.4s ease-out 1s,
      right 0.4s ease-in 1s,
      transform 0.4s ease-in-out 1s,
      opacity 0.4s ease-in-out 1s;
    z-index: 3;
    & i {
      font-size: 1.8em;
      margin-left: 0.5em;
    }
    &[data-active] {
      bottom: 10px;
      right: 20px;
      opacity: 0.5;
      transform: translateX(0) scale(0.5);
      transform-origin: bottom right;
    }
  }
  .wrapper {
    pointer-events: none;
    & :global {
      & .load-enter-active {
        transition: opacity 0.8s;
      }
      & .load-leave-active {
        transition: opacity 0.8s 1.2s;
      }
      & .load-enter,
      & .load-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
      }
    }
  }
</style>
