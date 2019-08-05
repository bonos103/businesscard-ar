<template lang="pug">
  div
    h1 {{title}}
    div
      a-textarea(
        :placeholder="placeholder",
        :autosize="{ minRows: 2, maxRows: 6 }"
      )
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      title: 'HOME',
      placeholder: 'Autosize height with minimum and maximum number of lines Autosize height with minimum and maximum number of lines',
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
