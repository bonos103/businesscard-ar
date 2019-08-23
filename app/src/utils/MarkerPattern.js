// QRコードにするURLからaframeで使うパターンファイルを生成する
import QRCode from 'qrcode'
import THREEx from '@/assets/javascripts/threex-arpatternfile'

class MarkerPatter {
  constructor(link, ratio, size) {
    this.link = link
    this.ratio = ratio || 0.5
    this.size = size || 300
  }

  get qrImageSrc() {
    return QRCode.toDataURL(this.link)
  }

  get markerSrc() {
    return (async () => {
      const imgSrc = await this.qrImageSrc
      return new Promise((resolve) => {
        THREEx.ArPatternFile.encodeImageURL(imgSrc, (patternFileString) => {
          const markerUrl = window.URL.createObjectURL(new Blob([patternFileString], { type: 'text/plain' }))
          resolve(markerUrl)
        })
      })
    })()
  }

  get markerImage() {
    return (async () => {
      const imgSrc = await this.qrImageSrc
      return new Promise((resolve) => {
        THREEx.ArPatternFile.buildFullMarker(imgSrc, this.ratio, this.size, 'black', (imageURL) => {
          resolve(imageURL)
        })
      })
    })()
  }
}

export default MarkerPatter
