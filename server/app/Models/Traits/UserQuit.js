'use strict'

const Item = use('App/Models/Item')
const Media = use('App/Models/Media')

class UserQuit {
  register(Model, customOptions = {}) {
    const defaultOptions = {}
    const options = Object.assign(defaultOptions, customOptions)

    Model.prototype.quit = async function () {
      const projects = await this.projects().fetch()
      const projectIds = projects.toJSON().map(el => el.id)
      const imageIds = projects.toJSON().map(el => el.image_id)
      const images = await Media.query().whereIn('id', imageIds).fetch(0)
      console.log(images)
      await Item.query().whereIn('project_id', projectIds).delete()
      await this.projects().delete()
      await Promise.all(images.rows.map(async image => await image.delete()))
      return await this.delete()
    }
  }
}

module.exports = UserQuit
