'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const path = require('path')

const Env = use('Env')
const Model = use('Model')
const dest = 'upload'

class Media extends Model {
  static boot() {
    super.boot()
    this.addTrait('Uploader', {
      dest,
    })
    this.addHook('beforeDelete', async (media) => {
      await media.deleteFile()
    })
  }

  static get computed() {
    return ['path', 'fullPath']
  }

  getPath({ name, dir }) {
    return path.join('/', dest, dir, name)
  }

  getFullPath() {
    return new URL(this.getPath(this), Env.get('URL'))
  }
}

module.exports = Media
