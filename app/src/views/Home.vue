<template lang="pug">
  h1 {{title}}
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      title: 'HOME',
    }
  },
  metaInfo() {
    return {
      meta: [
        {
          vmid: 'viewport',
          name: 'viewport',
          content: 'width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0',
        },
      ],
    }
  },
}
</script>
