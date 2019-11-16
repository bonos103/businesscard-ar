'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddColumnToUserSchema extends Schema {
  up () {
    this.table('users', (table) => {
      // alter table
      table.enu('source', ['local', 'facebook', 'twitter']).defaultTo('local')
      table.dropUnique('email')
      table.unique(['email', 'source'])
      table.string('password', 60).nullable().alter()
    })
  }

  down () {
    this.table('users', (table) => {
      // reverse alternations
      table.dropColumn('source')
      table.dropUnique(['email', 'source'])
      table.unique('email')
    })
  }
}

module.exports = AddColumnToUserSchema
