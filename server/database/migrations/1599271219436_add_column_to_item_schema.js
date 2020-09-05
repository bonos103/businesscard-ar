'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddColumnToItemSchema extends Schema {
  up() {
    this.table('items', (table) => {
      // alter table
      table.enu('align', ['left', 'center', 'right']).defaultTo('left')
    })
  }

  down() {
    this.table('items', (table) => {
      // reverse alternations
      table.dropColumn('align')
    })
  }
}

module.exports = AddColumnToItemSchema
