'use strict'

const puppeteer = require('puppeteer')

const Env = use('Env')

// const Auth = use('Adonis/Src/Auth')
const User = use('App/Models/User')
const Media = use('App/Models/Media')
// const Config = use('Config')

class ProjectImage {
  register(Model, customOptions = {}) {
    const defaultOptions = {}
    const options = Object.assign(defaultOptions, customOptions) // eslint-disable-line

    Model.prototype.takeThumbnail = async function takeThumbnail({ auth }, trx) {
      if (!this.user_id) {
        return
      }
      if (this.image_id) {
        const oldImage = await Media.find(this.image_id)
        if (oldImage) {
          this.image_id = null
          await this.save(trx)
          await oldImage.delete(trx)
        }
      }
      // const auth = new Auth({}, Config)
      const user = await User.find(this.user_id)
      const jwtToken = await auth.generate(user)

      const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        defaultViewport: {
          width: 1200,
          height: 1200,
          deviceScaleFactor: 0.75,
        },
        executablePath: '/usr/bin/chromium-browser',
        ignoreHTTPSErrors: true,
      })
      const page = await browser.newPage()

      await page.setCookie({
        name: 'token',
        value: jwtToken.token,
        url: Env.get('CLIENT_URL'),
        expires: Math.floor(new Date('3000/12/12').getTime() / 1000),
        secure: true,
      })

      await page.goto(`${Env.get('CLIENT_URL')}/project/${this.id}/edit`, { waitUntil: 'networkidle2' })
      const image = await page.screenshot({
        // encoding: 'base64',
        clip: {
          x: 200,
          y: 200,
          width: 800,
          height: 800,
        },
      })
      await browser.close()
      const media = await Media.upload({
        file: image,
        type: 'image/png',
        size: image.length,
        name: 'screenshot.png',
        dir: 'screen',
      })
      this.image_id = media.id
      await this.save(trx)
    }
  }
}

module.exports = ProjectImage
