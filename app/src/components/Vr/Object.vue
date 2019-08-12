<template lang="pug">
  div#target1(:class="$style.wrapper") {{text}}
</template>
<style module>
  .wrapper {
    display: inline-block;
    color: blue;
    max-width: 900px;
    font-size: 36px;
    white-space: pre-wrap;
  }
</style>
<script>
export default {
  name: 'Object',
  props: {
    text: {
      Type: 'String',
      required: true,
    },
  },
}
</script>
