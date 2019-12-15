'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddColumnToProjectSchema extends Schema {
  up () {
    this.table('projects', (table) => {
      // alter table
      table.string('uid').unique().index()
    })
  }

  down () {
    this.table('projects', (table) => {
      // reverse alternations
      table.dropUnique('uid')
      table.dropColumn('uid')
    })
  }
}

module.exports = AddColumnToProjectSchema
