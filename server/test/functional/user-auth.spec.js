'use strict'

const moment = require('moment')

const { test, trait } = use('Test/Suite')('User')
const Encryption = use('Encryption')
const Factory = use('Factory')

const UserFactory = Factory.model('App/Models/User')

trait('DatabaseTransactions')
trait('Test/ApiClient')

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
      validation: 'validAuthCode',
    },
  ])
})
test('メール認証：認証コードが不正 if no email in code', async ({ client }) => {
  const { password } = await UserFactory.make()
  const createdDate = moment().subtract(2, 'days')
  const code = Encryption.encrypt(JSON.stringify({ password, createdDate }))
  const data = {
    code,
  }
  const response = await client.post('/api/v1/user/auth').send(data).end()
  response.assertStatus(400)
  response.assertJSONSubset([
    {
      message: '認証に失敗しました',
      field: 'code',
      validation: 'validAuthCode',
    },
  ])
})
test('メール認証：認証コードが不正 if no password in code', async ({ client }) => {
  const { email } = await UserFactory.make()
  const createdDate = moment()
  const code = Encryption.encrypt(JSON.stringify({ email, createdDate }))
  const data = {
    code,
  }
  const response = await client.post('/api/v1/user/auth').send(data).end()
  response.assertStatus(400)
  response.assertJSONSubset([
    {
      message: '認証に失敗しました',
      field: 'code',
      validation: 'validAuthCode',
    },
  ])
})
test('メール認証：認証コードが不正 if no createdDate in code', async ({ client }) => {
  const { email, password } = await UserFactory.make()
  const code = Encryption.encrypt(JSON.stringify({ email, password }))
  const data = {
    code,
  }
  const response = await client.post('/api/v1/user/auth').send(data).end()
  response.assertStatus(400)
  response.assertJSONSubset([
    {
      message: '認証に失敗しました',
      field: 'code',
      validation: 'validAuthCode',
    },
  ])
})
test('メール認証：認証コードが期限切れ', async ({ client }) => {
  const { email, password } = await UserFactory.make()
  const createdDate = moment().subtract(2, 'days')
  const code = Encryption.encrypt(JSON.stringify({ email, password, createdDate }))
  const data = {
    code,
  }
  const response = await client.post('/api/v1/user/auth').send(data).end()
  response.assertStatus(400)
  response.assertJSONSubset([
    {
      message: '期限切れです',
      field: 'code',
      validation: 'timeoutCode',
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
