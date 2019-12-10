'use strict'

const puppeteer = require('puppeteer')

class PuppeteerController {
  async index({ auth, response }) {
    const user = await auth.getUser()
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
      url: 'https://app:8080/',
      expires: new Date('3000/12/12').getTime(),
      secure: true,
    })
    // const res = await page.goto('https://app:8080/api/v1/user/check', { waitUntil: 'networkidle2' })
    // Logger.info(await res.text())
    await page.goto('https://app:8080/project/1/edit', { waitUntil: 'networkidle2' })
    // Logger.info(JSON.stringify(await page.cookies('https://app:8080/project/')))
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
    response.type('image/png').json(image)
  }
}

module.exports = PuppeteerController
