'use strict'

const { test, trait } = use('Test/Suite')('User')
const Factory = use('Factory')

const UserFactory = Factory.model('App/Models/User')

trait('DatabaseTransactions')
trait('Test/ApiClient')

test('can create a challenge if valid data', async ({ assert, client }) => {
  const { email, password } = await UserFactory.make()
  const data = {
    email,
    password,
  }
  const response = await client.post('/api/v1/user').send(data).end()
  response.assertStatus(201)
  response.assertJSONSubset({
    email,
  })
})
