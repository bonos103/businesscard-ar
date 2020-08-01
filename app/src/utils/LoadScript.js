class LoadScript {
  constructor(src, id, position) {
    this.src = src
    this.id = id
    this.position = position
  }

  async load() {
    if (!document) {
      console.log('failed loadPromise')
      return
    }
    const script = document.createElement('script')
    script.src = this.src
    script.type = 'application/javascript'
    if (this.id) {
      script.id = this.id
    }
    document.body.appendChild(script)
    switch (this.position) {
      case 'body':
        document.body.appendChild(script)
        break
      case 'pbody':
        document.body.prepend(script)
        break
      default:
        document.head.appendChild(script)
        break
    }
    await this.loadPromise()
    return
  }

  loadPromise() {
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
