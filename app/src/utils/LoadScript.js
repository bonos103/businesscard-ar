class LoadScript {
  constructor(src, id) {
    this.src = src
    this.id = id
  }

  async load() {
    if (!document) {
      return
    }
    const script = document.createElement('script')
    script.src = this.src
    if (this.id) {
      script.id = this.id
    }
    document.body.appendChild(script)
    await this.loadPromise()
  }

  async loadPromise() {
    return new Promise((resolve, reject) => {
      const $el = document.querySelector(`#${this.id}`)
      if (!$el) {
        reject()
      }
      $el.addEventListener('load', () => {
        resolve()
      })
    })
  }
}

export default LoadScript
