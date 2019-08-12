// htmlをcanvasに変換
import html2canvas from 'html2canvas'

class Object2Canvas {
  constructor(node, options) {
    this.node = node
    this.options = Object.assign({ backgroundColor: 'transparent' }, options)
  }

  async init() {
    this.canvas = await html2canvas(this.node, this.options)
  }

  async toDataURL(type = 'image/png') {
    if (!this.canvas) {
      await this.init()
    }
    return this.canvas.toDataURL(type)
  }

  async aframeSize() {
    if (!this.canvas) {
      await this.init()
    }
    const w = this.canvas.width
    const h = this.canvas.height
    const ratio = w / 900
    if (w < h) {
      return {
        width: (w / w) * ratio,
        height: (h / w) * ratio,
      }
    }
    return {
      width: (w / h) * ratio,
      height: (h / h) * ratio,
    }
  }
}

export default Object2Canvas
