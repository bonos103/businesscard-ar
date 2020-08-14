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

Factory.blueprint('App/Models/Project', (faker, i, data) => ({
  title: data.title || faker.sentence({ word: 20 }),
}))

Factory.blueprint('App/Models/Item', (faker, i, data) => ({
  type: data.type || 'text',
  value: data.value || faker.sentence({ word: 5 }),
  scale_x: data.scale_x || 1,
  scale_y: data.scale_y || 1,
  scale_z: data.scale_z || 1,
  x: data.x || 0,
  y: data.y || 0,
  z: data.z || 0,
  width: data.width || 3,
  height: data.height || 4,
  font_size: data.font_size || 18,
  color: data.color || '#000000',
}))

Factory.blueprint('App/Models/Media', () => ({
  name: 'name_1576073470120.png',
  dir: 'test',
  type: 'image/png',
  size: 478243,
}))
