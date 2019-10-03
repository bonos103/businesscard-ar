<template lang="pug">
  div(:class="$style.knob", :position="position")
</template>
<style module>
  .knob {
    position: absolute;
    background-color: transparent;
    cursor: move;
    &[position="top"],
    &[position="bottom"] {
      left: 0;
      width: 100%;
      height: 9px;
    }
    &[position="right"],
    &[position="left"] {
      top: 0;
      width: 9px;
      height: 100%;
    }
    &[position="top"] {
      top: -5px;
    }
    &[position="bottom"] {
      bottom: -5px;
    }
    &[position="right"] {
      right: -5px;
    }
    &[position="left"] {
      left: -5px;
    }
  }
</style>
<script>
export default {
  props: {
    position: { type: String },
  },
}
</script>
