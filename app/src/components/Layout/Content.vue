<template lang="pug">
  div(:class="$style.content")
    slot
</template>
<style module>
  .content {
    max-width: 1200px;
    padding-left: 20px;
    padding-right: 20px;
    margin-left: auto;
    margin-right: auto;
  }
</style>
