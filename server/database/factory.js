'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint('App/Models/User', (faker, i, data) => ({
  email: data.email || faker.email(),
  password: data.password || 'password',
}))

Factory.blueprint('App/Models/Ar', (faker, i, data) => ({
  title: data.title || faker.sentence({ word: 5 }),
  content: data.content || faker.paragraph(),
}))
