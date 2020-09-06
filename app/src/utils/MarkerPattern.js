// QRコードにするURLからaframeで使うパターンファイルを生成する
import QRCode from 'qrcode'
import THREEx from '@/assets/javascripts/threex-arpatternfile'

class MarkerPatter {
  constructor(link, ratio, size) {
    this.link = link
    this.ratio = ratio || 0.9
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
        const whiteMargin = (1 - this.ratio) / 2
        const blackMargin = (1 - 2 * whiteMargin) * ((1 - this.ratio) / 2)
        // const transparentMargin = blackMargin
        const innerMargin = whiteMargin + blackMargin
        // const innerMargin = whiteMargin + blackMargin + transparentMargin

        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        canvas.width = this.size
        canvas.height = this.size

        // context.fillStyle = 'white'
        // context.fillRect(0, 0, canvas.width, canvas.height)

        // copy image on canvas
        context.fillStyle = 'black'
        context.fillRect(
          whiteMargin * canvas.width,
          whiteMargin * canvas.height,
          canvas.width * (1 - 2 * whiteMargin),
          canvas.height * (1 - 2 * whiteMargin),
        )

        // clear the area for innerImage (in case of transparent image)
        context.fillStyle = 'white'
        context.fillRect(
          innerMargin * canvas.width,
          innerMargin * canvas.height,
          canvas.width * (1 - 2 * innerMargin),
          canvas.height * (1 - 2 * innerMargin),
        )


        // display innerImage in the middle
        const innerImage = document.createElement('img')
        innerImage.addEventListener('load', () => {
          // draw innerImage
          context.drawImage(
            innerImage,
            innerMargin * canvas.width,
            innerMargin * canvas.height,
            canvas.width * (1 - 2 * innerMargin),
            canvas.height * (1 - 2 * innerMargin),
          )

          const imageUrl = canvas.toDataURL()
          // onComplete(imageUrl)
          resolve(imageUrl)
        })
        innerImage.src = imgSrc


        // THREEx.ArPatternFile.buildFullMarker(imgSrc, this.ratio, this.size, 'black', (imageURL) => {
        //   resolve(imageURL)
        // })
      })
    })()
  }
}

export default MarkerPatter
