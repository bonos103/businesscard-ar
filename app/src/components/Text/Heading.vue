<template lang="pug">
  h1(:class="$style.heading")
    slot
</template>
<style module>
  .heading {
    font-size: 2.4rem;
    margin-bottom: 1em;
    @media (--md) {
      font-size: 3rem;
    }
  }
</style>
