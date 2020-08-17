'use strict'

const path = require('path')

const Drive = use('Drive')
const Env = use('Env')
const Helpers = use('Helpers')

const isTest = Env.get('NODE_ENV') === 'testing'
class Uploader {
  register(Model, customOptions = {}) {
    const defaultOptions = {
      dest: 'upload',
    }
    const options = Object.assign(defaultOptions, customOptions)

    if (isTest) {
      options.dest = 'upload/test'
    }

    Model.upload = async ({
      file, name, dir = '', type, size,
    }) => {
      const nameObject = path.parse(name)
      const fileName = path.format({
        name: `${[nameObject.name, new Date().getTime()].join('_')}`,
        ext: nameObject.ext,
      })
      const filePath = path.join(Helpers.publicPath(options.dest), dir, fileName)

      await Drive.put(filePath, file)

      const m = new Model()
      m.fill({
        name: fileName,
        dir,
        type,
        size,
      })
      await m.save()

      return m
    }

    Model.prototype.deleteFile = async () => {
      const filePath = path.join(Helpers.publicPath(options.dest), this.dir, this.name)
      await Drive.delete(filePath)
    }
  }
}

module.exports = Uploader
