<template lang="pug">
  div {{text}}
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      require: true,
    },
  },
}
</script>
