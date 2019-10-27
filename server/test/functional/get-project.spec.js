'use strict'

const { test, trait } = use('Test/Suite')('CreateProject')
const Factory = use('Factory')

const ItemFactory = Factory.model('App/Models/Item')
const ProjectFactory = Factory.model('App/Models/Project')
const UserFactory = Factory.model('App/Models/User')

trait('DatabaseTransactions')
trait('Test/ApiClient')
trait('Auth/Client')

test('can get project only owner', async ({ client }) => {
  const user = await UserFactory.create()
  const project = await ProjectFactory.create()
  const item = await ItemFactory.create()

  await project.user().associate(user)
  await item.project().associate(project)

  const response = await client
  .get(`/api/v1/project/${project.id}`)
  .loginVia(user, 'jwt')
  .end()

  response.assertStatus(200)
  response.assertJSONSubset({
    ...project.toJSON(),
    items: [
      item.toJSON(),
    ],
  })
})

test('cannot get project from other user', async ({ client }) => {
  const user = await UserFactory.create()
  const otherUser = await UserFactory.create()
  const project = await ProjectFactory.create()

  await project.user().associate(user)

  const response = await client
  .get(`/api/v1/project/${project.id}`)
  .loginVia(otherUser, 'jwt')
  .end()

  response.assertStatus(401)
  response.assertJSONSubset({
    message: '閲覧権限がありません。',
    field: 'id',
    validation: 'auth',
  })
})

test('cannot get project if no project', async ({ client }) => {
  const user = await UserFactory.create()

  const response = await client
  .get(`/api/v1/project/1`)
  .loginVia(user, 'jwt')
  .end()

  response.assertStatus(400)
  response.assertJSONSubset({
    message: 'プロジェクトが見つかりませんでした。',
    field: 'id',
    validation: 'required',
  })
})

test('cannot get project if unsigned', async ({ client }) => {
  const response = await client
  .get(`/api/v1/project/1`)
  .end()

  response.assertStatus(401)
})
