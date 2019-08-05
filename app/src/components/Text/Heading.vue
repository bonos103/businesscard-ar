<template lang="pug">
  h1(:class="$style.heading")
    slot
</template>
<style module>
  .heading {
    font-size: 2.4rem;
    margin-top: 1em;
    margin-bottom: 1em;
  }
</style>
