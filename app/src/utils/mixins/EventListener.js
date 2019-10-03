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
    $listenRemove() {
      if (this.$eventRemovers) {
        this.$eventRemovers.forEach((eventRemover) => {
          eventRemover.remove()
        })
      }
    },
  },
  destroyed() {
    this.$listenRemove()
  },
}
export default listener
