'use strict'

const { test, trait } = use('Test/Suite')('User')
const User = use('App/Models/User')

trait('DatabaseTransactions')

test('dirty password', async ({ assert }) => {
  const user = new User()
  user.email = 'hoge@hoge.com'
  user.password = 'password'
  const result = await user.save()
  assert.notEqual(user.password, 'password', `result: ${result}`)
})
