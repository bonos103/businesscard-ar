'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Item extends Model {
  project() {
    return this.belongsTo('App/Models/Project')
  }
}

module.exports = Item
