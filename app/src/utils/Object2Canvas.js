// htmlをcanvasに変換
import html2canvas from 'html2canvas'

class Object2Canvas {
  constructor(node, options) {
    this.node = node
    this.options = Object.assign({ backgroundColor: 'transparent' }, options)
  }

  async canvas() {
    return new Promise((resolve, reject) => {
      html2canvas(this.node, this.options)
        .then(resolve)
        .catch(reject)
    })
  }
}

export default Object2Canvas
