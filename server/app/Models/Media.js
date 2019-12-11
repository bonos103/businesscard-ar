'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const path = require('path')

const Model = use('Model')
const dest = 'upload'

class Media extends Model {
  static boot() {
    super.boot()
    this.addTrait('Uploader', {
      dest,
    })
  }

  static get computed() {
    return ['path']
  }

  getPath({ name, dir }) {
    return path.join('/', dest, dir, name)
  }
}

module.exports = Media
