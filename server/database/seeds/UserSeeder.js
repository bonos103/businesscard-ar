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
  async run() {
    let user = await User.findBy('email', 'tomi@ryou103.com')
    if (!user) {
      user = await Factory.model('App/Models/User').create({
        email: 'tomi@ryou103.com',
        password: 'password',
      })
    }
    if (!user.ars.length) {
      const ar = await Factory.model('App/Models/Ar').make()
      user.ars().save(ar)
    }
  }
}

module.exports = UserSeeder
