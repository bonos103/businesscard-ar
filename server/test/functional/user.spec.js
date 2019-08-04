'use strict'

const { test, trait } = use('Test/Suite')('User')
const Factory = use('Factory')
const Mail = use('Mail')

const UserFactory = Factory.model('App/Models/User')

trait('DatabaseTransactions')
trait('Test/ApiClient')

test('can create user if valid data', async ({ assert, client }) => {
  Mail.fake()
  const { email, password } = await UserFactory.make()
  const data = {
    email,
    password,
  }
  const response = await client.post('/api/v1/user').send(data).end()
  response.assertStatus(201)
  response.assertJSONSubset({
    message: '会員登録完了しました',
  })
  assert.exists(response.body.user)
  assert.exists(response.body.token)

  const recentEmail = Mail.pullRecent()
  assert.equal(recentEmail.message.to[0].address, email)
  assert.equal(recentEmail.message.subject, '会員登録いただきありがとうございます。')

  Mail.restore()
}).timeout(6000)

test('cannot create a user if no email', async ({ client }) => {
  const { password } = await UserFactory.make()
  const data = {
    password,
  }
  const response = await client.post('/api/v1/user').send(data).end()
  response.assertStatus(400)
  response.assertJSONSubset([
    {
      message: 'メールアドレスは必須です',
      field: 'email',
      validation: 'required',
    },
  ])
})

test('cannot create a user if invalid email', async ({ client }) => {
  const { password } = await UserFactory.make()
  const data = {
    email: 'invalid email',
    password,
  }
  const response = await client.post('/api/v1/user').send(data).end()
  response.assertStatus(400)
  response.assertJSONSubset([
    {
      message: 'メールアドレスが正しくありません',
      field: 'email',
      validation: 'email',
    },
  ])
})

test('cannot create a user if exist email', async ({ client }) => {
  const user = await UserFactory.create()
  const data = {
    email: user.email,
    password: user.password,
  }
  const response = await client.post('/api/v1/user').send(data).end()
  response.assertStatus(400)
  response.assertJSONSubset([
    {
      message: 'メールアドレスは既に存在しています',
      field: 'email',
      validation: 'unique',
    },
  ])
})

test('cannot create a user if no password', async ({ client }) => {
  const { email } = await UserFactory.make()
  const data = {
    email,
  }
  const response = await client.post('/api/v1/user').send(data).end()
  response.assertStatus(400)
  response.assertJSONSubset([
    {
      message: 'パスワードは必須です',
      field: 'password',
      validation: 'required',
    },
  ])
})
