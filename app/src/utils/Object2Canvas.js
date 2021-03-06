// htmlをcanvasに変換
import html2canvas from 'html2canvas'

class Object2Canvas {
  constructor(node, options) {
    this.node = node
    this.options = Object.assign({
      backgroundColor: 'transparent',
      logging: process.env.NODE_ENV === 'development',
    }, options)
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
    const ratio = (w / 1800) * 2
    return {
      width: (w / w) * ratio,
      height: (h / w) * ratio,
    }
  }
}

export default Object2Canvas
