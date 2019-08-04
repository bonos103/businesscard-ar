'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ArSchema extends Schema {
  up() {
    this.createIfNotExists('ars', (table) => {
      table.increments()
      table.string('title', 254)
      table.text('content').notNullable()
      table.timestamps()
    })
  }

  down() {
    this.dropIfExists('ars')
  }
}

module.exports = ArSchema
