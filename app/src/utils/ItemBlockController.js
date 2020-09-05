export default class ItemBlockController {
  constructor(item) {
    this.item = Object.assign({}, item)
  }

  set item(data) {
    this._item = Object.assign({}, data)
  }

  get item() {
    return this._item
  }


  /**
   * @param {object} data
   * @param {number} data.dx window基準のX軸の変化量
   * @param {number} data.dy window基準のY軸の変化量。→ AR基準だとZ
   * @param {string} data.position 動かしているknobの位置
   * @returns {object} AR基準のX, Z, Width, Height
   */
  resize(data) {
    const { dx = 0, dy = 0, position } = data
    if (!position) {
      return false
    }
    const browserSize = this.convertBrowserSize()
    let {
      width,
      height,
      x,
      z,
    } = browserSize
    const { y } = browserSize

    switch (position) {
      case 'top-left': {
        width -= dx
        height -= dy
        x += dx / 2
        z += dy / 2
        break
      }
      case 'top-center': {
        height -= dy
        z += dy / 2
        break
      }
      case 'top-right': {
        width += dx
        height -= dy
        x += dx / 2
        z += dy / 2
        break
      }
      case 'center-right': {
        width += dx
        x += dx / 2
        break
      }
      case 'bottom-right': {
        width += dx
        height += dy
        x += dx / 2
        z += dy / 2
        break
      }
      case 'bottom-center': {
        height += dy
        z += dy / 2
        break
      }
      case 'bottom-left': {
        width -= dx
        height += dy
        x += dx / 2
        z += dy / 2
        break
      }
      case 'center-left': {
        width -= dx
        x += dx / 2
        break
      }
      default: {
        break
      }
    }
    const result = this.convertArSize({
      width,
      height,
      x,
      y,
      z,
    })
    this.item = Object.assign(this.item, result)
    return result
  }

  /**
   * @param {object} data
   * @param {number} data.dx window基準のX軸の変化量
   * @param {number} data.dy window基準のY軸の変化量。→ AR基準だとZ
   * @returns {object} AR基準のX,Z
   */
  move(data) {
    const { dx, dy } = data
    let {
      x,
      z,
    } = this.convertBrowserSize()

    x += dx
    z += dy
    const result = this.convertArSize({
      x,
      z,
    })
    this.item = Object.assign(this.item, {
      x: result.x,
      z: result.z,
    })
    return {
      x: result.x,
      z: result.z,
    }
  }

  convertBrowserSize() {
    return {
      width: this.constructor.ar2PxUnit(this.item.width),
      height: this.constructor.ar2PxUnit(this.item.height),
      x: this.constructor.ar2PxUnit(this.item.x),
      y: this.constructor.ar2PxUnit(this.item.y),
      z: this.constructor.ar2PxUnit(this.item.z),
    }
  }

  convertArSize(data) {
    return {
      width: this.constructor.px2ArUnit(data.width),
      height: this.constructor.px2ArUnit(data.height),
      x: this.constructor.px2ArUnit(data.x),
      y: this.constructor.px2ArUnit(data.y),
      z: this.constructor.px2ArUnit(data.z),
    }
  }

  static px2ArUnit(value) {
    return value / 100
  }

  static ar2PxUnit(value) {
    return value * 100
  }

  static _roundValue(value) {
    return Math.round(value * 100) / 100
  }
}
