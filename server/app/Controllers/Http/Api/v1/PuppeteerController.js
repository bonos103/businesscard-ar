'use strict'

const puppeteer = require('puppeteer')

class PuppeteerController {
  async index({ response }) {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      executablePath: '/usr/bin/chromium-browser',
    })
    const page = await browser.newPage()
    await page.goto('https://liginc.co.jp/')
    const image = await page.screenshot()

    await browser.close()
    response.ok(image)
  }
}

module.exports = PuppeteerController
