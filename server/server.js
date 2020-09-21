'use strict'

/*
|--------------------------------------------------------------------------
| Http server
|--------------------------------------------------------------------------
|
| This file bootstraps Adonisjs to start the HTTP server. You are free to
| customize the process of booting the http server.
|
| """ Loading ace commands """
|     At times you may want to load ace commands when starting the HTTP server.
|     Same can be done by chaining `loadCommands()` method after
|
| """ Preloading files """
|     Also you can preload files by calling `preLoad('path/to/file')` method.
|     Make sure to pass a relative path from the project root.
*/

const { Ignitor } = require('@adonisjs/ignitor')
const Ford = require('@adonisjs/fold')
const fs = require('fs')
const https = require('https')
const path = require('path')
// const pem = require('pem')

if (process.env.NODE_ENV === 'development') {
  // Certificate
  const options = {
    key: fs.readFileSync(path.join(__dirname, '../cert/localhost+2-key.pem')),
    cert: fs.readFileSync(path.join(__dirname, '../cert/localhost+2.pem')),
  }
  new Ignitor(Ford)
    .appRoot(__dirname)
    .fireHttpServer(handler => https.createServer(options, handler))
    .catch(console.error)
} else {
  new Ignitor(Ford)
    .appRoot(__dirname)
    .fireHttpServer()
    .catch(console.error)
}

// pem.createCertificate({ days: 1, selfSigned: true }, (error, keys) => {
//   if (error) {
//     return console.log(error)
//   }

//   const options = {
//     key: keys.serviceKey,
//     cert: keys.certificate,
//   }

//   return new Ignitor(Ford)
//     .appRoot(__dirname)
//     .fireHttpServer(handler => https.createServer(options, handler))
//     .catch(console.error)
// })
