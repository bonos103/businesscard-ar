// QRコードにするURLからaframeで使うパターンファイルを生成する
import QRCode from 'qrcode'
import THREEx from '@/assets/javascripts/threex-arpatternfile'

class MarkerPatter {
  constructor(link) {
    this.link = link
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
}

export default MarkerPatter
