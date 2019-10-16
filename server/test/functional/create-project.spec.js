'use strict'

const { test, trait } = use('Test/Suite')('CreateProject')
const Factory = use('Factory')

const ProjectFactory = Factory.model('App/Models/Project')
const UserFactory = Factory.model('App/Models/User')

trait('DatabaseTransactions')
trait('Test/ApiClient')
trait('Auth/Client')

test('can create project if valid data', async ({ client }) => {
  const user = await UserFactory.create()

  const { title } = await ProjectFactory.make()

  const data = {
    title,
  }

  const response = await client
  .post('/api/v1/project')
  .loginVia(user, 'jwt')
  .send(data)
  .end()

  response.assertStatus(201)
  response.assertJSONSubset({
    title,
    user_id: user.id,
  })
})

test('cannot create project if not authenticated', async({ client }) => {
  const { title } = await ProjectFactory.make()

  const data = {
    title,
  }

  const response = await client
  .post('/api/v1/project')
  .send(data)
  .end()

  response.assertStatus(401)
})

test('failed create project if no title', async ({ client }) => {
  const user = await UserFactory.create()
  const data = {}

  const response = await client
  .post('/api/v1/project')
  .loginVia(user, 'jwt')
  .send(data)
  .end()

  response.assertStatus(400)
  response.assertJSONSubset([
    {
      message: 'タイトルは必須です',
      field: 'title',
      validation: 'required',
    }
  ])
})

test('failed create project if title of over 255 characters', async ({ client }) => {
  const user = await UserFactory.create()
  const data = {
    title: '123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890',
  }

  const response = await client
  .post('/api/v1/project')
  .loginVia(user, 'jwt')
  .send(data)
  .end()

  console.log(response)

  response.assertStatus(400)
  response.assertJSONSubset([
    {
      message: '最大255文字までです',
      field: 'title',
      validation: 'max',
    }
  ])
})
