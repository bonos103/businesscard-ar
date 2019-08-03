'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

const User = use('App/Models/User')

class UserSeeder {
  async run () {
    if (await User.findBy('email', 'tomi@ryou103.com')) {
      return
    }
    const user = await Factory.model('App/Models/User').make({
      email: 'tomi@ryou103.com',
      password: 'password',
    })
  }
}

module.exports = UserSeeder
