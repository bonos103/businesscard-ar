'use strict'

const { test, trait } = use('Test/Suite')('CreateProject')
const Factory = use('Factory')

const ItemFactory = Factory.model('App/Models/Item')
const ProjectFactory = Factory.model('App/Models/Project')
const UserFactory = Factory.model('App/Models/User')

const Project = use('App/Models/Project')

trait('DatabaseTransactions')
trait('Test/ApiClient')
trait('Auth/Client')

test('can create preview project', async ({ client }) => {
  const user = await UserFactory.create()

  const { title } = await ProjectFactory.make()
  const item = await ItemFactory.make()

  const data = {
    title,
    items: [
      item,
    ],
  }

  const response = await client
    .post('/api/v1/project/preview')
    .loginVia(user, 'jwt')
    .send(data)
    .end()

  // console.dir(response.error)
  // console.dir(response.body)
  // requestとresponseでuuidが違うこと
  // status === 'preview'であること
  response.assertStatus(201)
  response.assertJSONSubset({
    title,
    user_id: user.id,
    items: [
      item.toJSON(),
    ],
    status: 'preview',
  })
})

test('only one preview project for each user', async ({ assert, client }) => {
  const user = await UserFactory.create()
  // 既存のpreview projectを作成しておく
  const previewProject1 = await ProjectFactory.create({ status: 'preview' })
  await previewProject1.user().associate(user)

  const { title } = await ProjectFactory.make()
  const item = await ItemFactory.make()

  const data = {
    title,
    items: [
      item,
    ],
  }

  const response = await client
    .post('/api/v1/project/preview')
    .loginVia(user, 'jwt')
    .send(data)
    .end()

  console.dir(response.error)
  console.dir(response.body)

  const count = await Project.query().where({ user_id: user.id, status: 'preview' }).getCount()

  // userにつきpreview projectは1つであること
  // status === 'preview'であること
  assert.equal(count, 1)
  response.assertStatus(201)
  response.assertJSONSubset({
    title,
    user_id: user.id,
    status: 'preview',
  })
})
