<template lang="pug">
  div(:class="$style.control")
    slot
</template>
<style module>
  .control {
    margin-bottom: 20px;
  }
</style>
