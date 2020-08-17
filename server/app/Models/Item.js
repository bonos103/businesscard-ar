'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Item extends Model {
  project() {
    return this.belongsTo('App/Models/Project')
  }

  getScaleX(x) {
    return Number(x)
  }

  getScaleY(y) {
    return Number(y)
  }

  getScaleZ(z) {
    return Number(z)
  }

  getX(x) {
    return Number(x)
  }

  getY(y) {
    return Number(y)
  }

  getZ(z) {
    return Number(z)
  }

  getWidth(width) {
    return Number(width)
  }

  getHeight(height) {
    return Number(height)
  }
}

module.exports = Item
