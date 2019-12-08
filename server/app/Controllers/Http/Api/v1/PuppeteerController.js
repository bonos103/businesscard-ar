'use strict'

const puppeteer = require('puppeteer')

const Logger = use('Logger')

class PuppeteerController {
  async index({ auth, response }) {
    const user = await auth.getUser()
    const jwtToken = await auth.generate(user)
    Logger.info(JSON.stringify(jwtToken))
    // const authorization = request.header('Authorization')
    // Logger.info(authorization)
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      executablePath: '/usr/bin/chromium-browser',
      ignoreHTTPSErrors: true,
    })
    const page = await browser.newPage()

    // await page.setRequestInterception(true)
    // page.on('request', (req) => {
    //   // Override headers
    //   // const headers = {
    //   //   ...req.headers(),
    //   //   Authorization: authorization,
    //   // }
    //   Logger.info(JSON.stringify(req.headers()))
    //   req.continue()
    //   // req.continue({ headers })
    // })

    // await page.setExtraHTTPHeaders({ authorization: `Bearer ${jwtToken.token}` })

    await page.setCookie({
      name: 'token',
      value: jwtToken.token,
      url: 'https://app:8080/',
      expires: new Date('3000/12/12').getTime(),
      secure: true,
    })
    // const res = await page.goto('https://app:8080/api/v1/user/check', { waitUntil: 'networkidle2' })
    // Logger.info(await res.text())
    await page.goto('https://app:8080/project/', { waitUntil: 'networkidle2' })
    // Logger.info(JSON.stringify(await page.cookies('https://app:8080/project/')))
    const image = await page.screenshot({
      // encoding: 'base64',
    })

    await browser.close()
    response.type('image/png').json(image)
  }
}

module.exports = PuppeteerController
