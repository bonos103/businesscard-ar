const listener = {
  methods: {
    $listen(target, eventType, callback) {
      if (!this.$eventRemovers) {
        this.$eventRemovers = []
      }
      target.addEventListener(eventType, callback)
      this.$eventRemovers.push({
        remove() {
          target.removeEventListener(eventType, callback)
        },
      })
    },
  },
  destroyed() {
    if (this.$eventRemovers) {
      this.$eventRemovers.forEach((eventRemover) => {
        eventRemover.remove()
      })
    }
  },
}
export default listener
