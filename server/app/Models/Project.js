'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Project extends Model {
  user() {
    return this.belongsTo('App/Models/User')
  }

  items() {
    return this.hasMany('App/Models/Item')
  }

  static scopeWithItems(query) {
    return query.with('items')
  }
}

module.exports = Project
