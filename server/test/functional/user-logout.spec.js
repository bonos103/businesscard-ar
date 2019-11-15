'use strict'

const { test, trait } = use('Test/Suite')('User Login')
const Auth = use('Adonis/Src/Auth')
const Config = use('Config')
const Factory = use('Factory')

const UserFactory = Factory.model('App/Models/User')

trait('DatabaseTransactions')
trait('Test/ApiClient')
trait('Auth/Client')

test('success logout', async ({ assert, client }) => {
  const auth = new Auth({}, Config)
  const user = await UserFactory.create()

  const { refreshToken } = await auth.withRefreshToken().generate(user)

  const response = await client.post('/api/v1/user/logout').loginVia(user, 'jwt').end()

  const result = await auth.generateForRefreshToken(refreshToken).catch((e) => assert.isOk(true, e))

  if (result) {
    assert.fail('refreshTokenが無効になっていません', result)
  }

  response.assertStatus(200)
  response.assertJSONSubset({
    message: 'ログアウトしました。',
  })
})

test('failed logout if not logined', async ({ assert, client }) => {
  const response = await client.post('/api/v1/user/logout').end()

  response.assertStatus(401)
})
