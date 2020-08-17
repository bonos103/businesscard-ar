'use strict'

const Item = use('App/Models/Item')
const Media = use('App/Models/Media')

class UserQuit {
  register(Model) {
    Model.prototype.quit = async function quit() {
      const projects = await this.projects().fetch()
      const projectIds = projects.toJSON().map(el => el.id)
      const imageIds = projects.toJSON().map(el => el.image_id)
      const images = await Media.query().whereIn('id', imageIds).fetch(0)

      await Item.query().whereIn('project_id', projectIds).delete()
      await this.projects().delete()
      await Promise.all(images.rows.map(image => image.delete()))
      const result = await this.delete()
      return result
    }
  }
}

module.exports = UserQuit
