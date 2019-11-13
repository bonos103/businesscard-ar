'use strict'

const { test, trait } = use('Test/Suite')('CreateProject')
const Factory = use('Factory')

const ItemFactory = Factory.model('App/Models/Item')
const ProjectFactory = Factory.model('App/Models/Project')
const UserFactory = Factory.model('App/Models/User')

trait('DatabaseTransactions')
trait('Test/ApiClient')
trait('Auth/Client')

test('update title and items', async ({ client }) => {
  const user = await UserFactory.create()
  const project = await ProjectFactory.create()
  const item = await ItemFactory.create()

  await project.user().associate(user)
  await item.project().associate(project)

  const data = {
    ...project.toJSON(),
    title: 'hoge',
    items: [{
      ...item.toJSON(),
      value: 'change value',
    }],
  }

  const response = await client
    .put(`/api/v1/project/${project.id}`)
    .send(data)
    .loginVia(user, 'jwt')
    .end()
  response.assertStatus(200)
  response.assertJSONSubset({
    title: 'hoge',
    items: [{
      ...item.toJSON(),
      value: 'change value',
    }],
  })
})

test('add new item', async ({ client }) => {
  const user = await UserFactory.create()
  const project = await ProjectFactory.create()
  const item = await ItemFactory.make()

  await project.user().associate(user)

  const data = {
    ...project.toJSON(),
    items: [{
      ...item.toJSON(),
    }],
  }

  const response = await client
    .put(`/api/v1/project/${project.id}`)
    .send(data)
    .loginVia(user, 'jwt')
    .end()

  response.assertStatus(200)
  response.assertJSONSubset({
    items: [{
      ...item.toJSON(),
    }],
  })
})

test('delete item', async ({ assert, client }) => {
  const user = await UserFactory.create()
  const project = await ProjectFactory.create()
  const item = await ItemFactory.create()

  await project.user().associate(user)
  await item.project().associate(project)

  const data = {
    ...project.toJSON(),
    items: [],
  }

  const response = await client
    .put(`/api/v1/project/${project.id}`)
    .send(data)
    .loginVia(user, 'jwt')
    .end()

  response.assertStatus(200)
  assert.equal(response.body.items.length, 0)
})

test('mixed process', async ({ client }) => {
  const user = await UserFactory.create()
  const project = await ProjectFactory.create()
  const updateItem = await ItemFactory.create()
  const removeItem = await ItemFactory.create()
  const addItem = await ItemFactory.make()

  await project.user().associate(user)
  await updateItem.project().associate(project)
  await removeItem.project().associate(project)

  const data = {
    ...project.toJSON(),
    items: [
      {
        ...updateItem.toJSON(),
        value: 'change value',
      },
      { ...addItem.toJSON() },
    ],
  }

  const response = await client
    .put(`/api/v1/project/${project.id}`)
    .send(data)
    .loginVia(user, 'jwt')
    .end()

  response.assertStatus(200)
  response.assertJSONSubset({
    items: [
      {
        ...updateItem.toJSON(),
        value: 'change value',
      },
      { ...addItem.toJSON() },
    ],
  })
})
