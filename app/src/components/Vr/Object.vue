<template lang="pug">
  div#target1(style="color: blue; width: 900px; font-size: 36px; white-space: pre-wrap;") {{text}}
</template>

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
