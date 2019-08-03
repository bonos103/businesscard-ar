'use strict'

const { test, trait } = use('Test/Suite')('User Login')
const Factory = use('Factory')

const UserFactory = Factory.model('App/Models/User')

trait('DatabaseTransactions')
trait('Test/ApiClient')

test('success login if valid data', async ({ assert,client }) => {
  const user = await UserFactory.create({
    password: 'password',
  })
  const data = {
    email: user.email,
    password: 'password',
  }
  const response = await client.post('/api/v1/user/login').send(data).end()
  response.assertStatus(200)
  response.assertJSONSubset({
    message: 'ログインしました',
  })
  assert.exists(response.body.user)
  assert.exists(response.body.token)
})

test('failed login if invalid valid', async ({ assert,client }) => {
  const user = await UserFactory.create({
    password: 'password',
  })
  const data = {
    email: user.email,
    password: 'invalid_password',
  }
  const response = await client.post('/api/v1/user/login').send(data).end()
  response.assertStatus(400)
  response.assertJSONSubset({
    message: 'メールアドレスかパスワードが間違っています。',
    field: 'password',
    validation: 'auth',
  })
})
