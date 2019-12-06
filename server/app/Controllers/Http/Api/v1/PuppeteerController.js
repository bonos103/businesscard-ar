'use strict'

const puppeteer = require('puppeteer')

const Logger = use('Logger')

class PuppeteerController {
  async index({ request, response }) {
    const authorization = request.header('Authorization')
    Logger.info(authorization)
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      executablePath: '/usr/bin/chromium-browser',
      ignoreHTTPSErrors: true,
    })
    const page = await browser.newPage()
    await page.setRequestInterception(true)
    page.on('request', (req) => {
      // Override headers
      // const headers = {
      //   ...req.headers(),
      //   Authorization: authorization,
      // }
      Logger.info(JSON.stringify(req.headers()))
      req.continue()
      // req.continue({ headers })
    })
    await page.setExtraHTTPHeaders({ "Authorization": authorization })
    await page.goto('https://app:8080/project/', { waitUntil: 'networkidle2' })
    const image = await page.screenshot({
      // encoding: 'base64',
    })

    await browser.close()
    response.type('image/png').json(image)
  }
}

module.exports = PuppeteerController
