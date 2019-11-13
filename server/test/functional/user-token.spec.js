'use strict'

const { test, trait } = use('Test/Suite')('User Token')
const Auth = use('Adonis/Src/Auth')
const Config = use('Config')
const Factory = use('Factory')

const UserFactory = Factory.model('App/Models/User')

trait('DatabaseTransactions')
trait('Test/ApiClient')

test('token check API', async ({ assert, client }) => {
  const user = await UserFactory.create()
  const auth = new Auth({}, Config)
  const { token } = await auth.withRefreshToken().generate(user)
  const response = await client.get('/api/v1/user/check').header('Authorization', `Bearer ${token}`).end()

  response.assertStatus(202)
  response.assertJSONSubset(user.toJSON())
})

test('refresh token API', async ({ assert, client }) => {
  const user = await UserFactory.create()
  const auth = new Auth({}, Config)
  const { refreshToken } = await auth.withRefreshToken().generate(user)
  const data = { refreshToken }

  const response = await client.post('/api/v1/user/refresh').send(data).end()

  response.assertStatus(200)
  assert.exists(response.body.token)
  assert.exists(response.body.refreshToken)

  const response2 = await client.post('/api/v1/user/refresh').send(data).end()
  response2.assertStatus(401)
})
