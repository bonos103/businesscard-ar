'use strict'

const path = require('path')

const Drive = use('Drive')
const Helpers = use('Helpers')

class Uploader {
  register (Model, customOptions = {}) {
    const defaultOptions = {
      dest: Helpers.resourcesPath('upload'),
    }
    const options = Object.assign(defaultOptions, customOptions)

    Model.upload = async ({ file, name, dir = '', type, size }) => {
      const nameObject = path.parse(name)
      const fileName = path.format({
        name: `${[nameObject.name, new Date().getTime()].join('_')}`,
        ext: nameObject.ext,
      })
      const filePath = path.join(options.dest, dir, fileName)

      await Drive.put(filePath, file)

      const m = new Model()
      m.fill({
        name: fileName,
        dir,
        type,
        size
      })
      await m.save()

      return m
    }
  }
}

module.exports = Uploader
