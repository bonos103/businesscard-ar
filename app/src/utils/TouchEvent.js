class TouchEvent {
  constructor() {
    this.timer = undefined
    this.onmousemove = undefined
    this.onmouseup = undefined
    this.origin = undefined
    this.pointer = undefined
    this.diff = undefined
    this.handleMove = e => this.move(e)
    this.handleEnd = e => this.end(e)
    window.addEventListener('mousemove', this.handleMove)
    window.addEventListener('mouseup', this.handleEnd)
  }

  set onmousemove(callback) {
    this._onmousemove = callback
  }

  get onmousemove() {
    return this._onmousemove
  }

  set onmouseup(callback) {
    this._onmouseup = callback
  }

  get onmouseup() {
    return this._onmouseup
  }

  start(e) {
    // console.log('start', e)
    this.origin = {
      x: e.x,
      y: e.y,
    }
    this.pointer = {
      x: e.x,
      y: e.y,
    }
  }

  move(e) {
    if (!this.timer) {
      this.timer = setTimeout(() => {
        this.timer = undefined
      }, 18)
      this.diff = {
        x: e.x - this.pointer.x,
        y: e.y - this.pointer.y,
      }
      if (this.onmousemove) {
        this.onmousemove(e)
      }
      this.pointer = {
        x: e.x,
        y: e.y,
      }
    }
  }

  end(e) {
    if (this.onmouseup) {
      this.onmouseup(e)
    }
    // console.log('end end')
    window.removeEventListener('mousemove', this.handleMove)
    window.removeEventListener('mouseup', this.handleEnd)
  }
}

export default TouchEvent
