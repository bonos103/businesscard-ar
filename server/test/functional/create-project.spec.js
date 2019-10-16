'use strict'

const { test, trait } = use('Test/Suite')('CreateProject')
const Factory = use('Factory')

const UserFactory = Factory.model('App/Models/User')

trait('DatabaseTransactions')
trait('Test/ApiClient')
trait('Auth/Client')

test('can create project if valid data', async ({ assert, client }) => {
  const user = await UserFactory.create()

  const data = {
    title: 'hoge',
  }

  const response = await client
    .post('/api/v1/project')
    .loginVia(user, 'jwt')
    .send(data)
    .end()

  console.log('error', response)

  response.assertStatus(201)
  response.assertJSONSubset({
    title: 'hoge',
    user_id: user.id,
  })
})
