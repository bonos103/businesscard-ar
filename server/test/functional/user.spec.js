'use strict'

const moment = require('moment')

const { test, trait } = use('Test/Suite')('User')
const Encryption = use('Encryption')
const Factory = use('Factory')

const UserFactory = Factory.model('App/Models/User')

trait('DatabaseTransactions')
trait('Test/ApiClient')

test('can create a user if valid data', async ({ assert, client }) => {
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

test('cannot create a user if no email', async ({ assert, client }) => {
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

test('cannot create a user if invalid email', async ({ assert, client }) => {
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

test('cannot create a user if exist email', async ({ assert, client }) => {
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

test('cannot create a user if no password', async ({ assert, client }) => {
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

test('メール認証：認証コードが不正', async ({ client }) => {
  const illegalCode = 'hogehgoe'
  const data = {
    code: 'hogehgoe',
  }
  const response = await client.post('/api/v1/user/auth').send(data).end()
  response.assertStatus(400)
  response.assertJSONSubset([
    {
      message: '認証に失敗しました',
      field: 'code',
      validation: 'invalid',
    },
  ])
})
test('メール認証：認証コードが期限切れ', async ({ client }) => {
  const { email, password } = await UserFactory.make()
  const createdDate = moment().subtract(1, 'days')
  const code = Encryption.encrypt(JSON.stringify({ email, password, createdDate }))
  const data = {
    code,
  }
  const response = await client.post('/api/v1/user/auth').send(data).end()
  response.assertStatus(400)
  response.assertJSONSubset([
    {
      message: '期限切れです。',
      field: 'code',
      validation: 'codeTimeout',
    },
  ])
})
test('メール認証：認証コードが正しい場合は、ユーザー作成', async ({ assert, client }) => {
  const { email, password } = await UserFactory.make()
  const createdDate = moment()
  const code = Encryption.encrypt(JSON.stringify({ email, password, createdDate }))
  const data = {
    code,
  }
  const response = await client.post('/api/v1/user/auth').send(data).end()

  response.assertStatus(200)
  response.assertJSONSubset({
    message: '登録完了しました。',
    user: { email, password },
  })
  assert.exists(response.token)
})
