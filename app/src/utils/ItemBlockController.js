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

  resize(data) {
    const { dx = 0, dy = 0, position } = data
    if (!position) {
      return false
    }
    let {
      width,
      height,
      x,
      y,
    } = this.convertBrowserSize()

    switch (position) {
      case 'top-left': {
        width -= dx
        height -= dy
        x += dx / 2
        y += dy / 2 * -1
        break
      }
      case 'top-center': {
        height -= dy
        y += dy / 2 * -1
        break
      }
      case 'top-right': {
        width += dx
        height -= dy
        x += dx / 2
        y += dy / 2 * -1
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
        y += dy / 2 * -1
        break
      }
      case 'bottom-center': {
        height += dy
        y += dy / 2 * -1
        break
      }
      case 'bottom-left': {
        width -= dx
        height += dy
        x += dx / 2
        y += dy / 2 * -1
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
    })
    this.item = Object.assign(this.item, result)
    return result
  }

  convertBrowserSize() {
    return {
      width: this.constructor.ar2PxUnit(this.item.width),
      height: this.constructor.ar2PxUnit(this.item.height),
      x: this.constructor.ar2PxUnit(this.item.x),
      y: this.constructor.ar2PxUnit(this.item.y),
    }
  }

  convertArSize(data) {
    return {
      width: this.constructor.px2ArUnit(data.width),
      height: this.constructor.px2ArUnit(data.height),
      x: this.constructor.px2ArUnit(data.x),
      y: this.constructor.px2ArUnit(data.y),
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
