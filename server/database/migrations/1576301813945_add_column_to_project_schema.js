'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddColumnToProjectSchema extends Schema {
  up () {
    this.table('projects', (table) => {
      // alter table
      table.integer('image_id').unsigned().references('id').inTable('media')
    })
  }

  down () {
    this.table('projects', (table) => {
      // reverse alternations
      table.dropForeign('image_id')
      table.dropColumn('image_id')
    })
  }
}

module.exports = AddColumnToProjectSchema
