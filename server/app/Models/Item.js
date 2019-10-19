'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Item extends Model {
  project() {
    return this.belongsTo('App/Models/Project')
  }

  getScaleX(scale_x) {
    return Number(scale_x)
  }

  getScaleY(scale_y) {
    return Number(scale_y)
  }

  getScaleZ(scale_z) {
    return Number(scale_z)
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
