'use strict'

const puppeteer = require('puppeteer')

class PuppeteerController {
  async index({ response }) {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      executablePath: '/usr/bin/chromium-browser',
      ignoreHTTPSErrors: true,
    })
    const page = await browser.newPage()
    await page.goto('https://app:8080/', { waitUntil: 'networkidle2' })
    const image = await page.screenshot({
      // encoding: 'base64',
    })

    await browser.close()
    response.json(image)
  }
}

module.exports = PuppeteerController
