'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddColumnToArSchema extends Schema {
  up() {
    this.alter('ars', (table) => {
      // alter table
      table.integer('user_id').unsigned().references('id').inTable('users')
    })
  }

  down() {
    this.alter('ars', (table) => {
      // reverse alternations
      table.dropColumn('user_id')
    })
  }
}

module.exports = AddColumnToArSchema
