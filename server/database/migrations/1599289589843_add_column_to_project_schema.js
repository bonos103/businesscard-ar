'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddColumnToProjectSchema extends Schema {
  up() {
    this.table('projects', (table) => {
      // alter table
      table.enu('status', ['publish', 'preview', 'draft', 'private']).defaultTo('publish')
    })
  }

  down() {
    this.table('projects', (table) => {
      // reverse alternations
      table.dropColumn('status')
    })
  }
}

module.exports = AddColumnToProjectSchema
