'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ItemSchema extends Schema {
  up() {
    this.create('items', (table) => {
      table.enu('type', ['text', 'social', 'image']).defaultTo('text')
      table.text('value')
      table.string('image_path')
      table.decimal('scale_x').defaultTo(1)
      table.decimal('scale_y').defaultTo(1)
      table.decimal('scale_z').defaultTo(1)
      table.decimal('x').defaultTo(0)
      table.decimal('y').defaultTo(0)
      table.decimal('z').defaultTo(0)
      table.decimal('width').defaultTo(3)
      table.decimal('height').defaultTo(4)
      table.integer('font_size').defaultTo(18)
      table.string('color').defaultTo('#000000')
      table.integer('project_id').unsigned().references('id').inTable('projects')
      table.increments()
      table.timestamps()
    })
  }

  down() {
    this.drop('items')
  }
}

module.exports = ItemSchema
