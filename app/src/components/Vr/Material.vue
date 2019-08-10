<template>
  <div style="width: 100%; height: 100%;
  position: fixed; left: 0; top: 0; z-index: -1; overflow: hidden">
    <div id="target1"
      style="color: blue; width: 300px; height: 300px; font-size: 240px;">
      {{text}}
    </div>
  </div>
</template>

<script>
// import html2canvas from 'html2canvas'

export default {
  name: 'Material',
  data() {
    return {
      show: false,
      text: null,
    }
  },
  async mounted() {
    if (this.$route.query.text) {
      this.text = this.$route.query.text
    }
  },
}
</script>
