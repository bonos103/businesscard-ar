'use strict'

const uid = require('short-uuid')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Project extends Model {
  static boot() {
    super.boot()
    this.addTrait('ProjectImage')
    this.addHook('beforeSave', async (project) => {
      console.log(project.uid, !project.uid)
      if (!project.uid) {
        project.uid = uid.generate()
      }
    })
  }

  user() {
    return this.belongsTo('App/Models/User')
  }

  image() {
    return this.belongsTo('App/Models/Media', 'image_id')
  }

  items() {
    return this.hasMany('App/Models/Item')
  }

  static scopeWithImage(query) {
    return query.with('image')
  }

  static scopeWithItems(query) {
    return query.with('items')
  }

  static scopeFindById(query, id) {
    return query.where('id', id)
  }
}

module.exports = Project
