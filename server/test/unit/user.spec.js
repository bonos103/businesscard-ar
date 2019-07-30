'use strict'

const { test, trait } = use('Test/Suite')('User')
const Factory = use('Factory')
const User = use('App/Models/User')

trait('DatabaseTransactions')

test('dirty password', async ({ assert }) => {
  const user = new User()
  const { email, password } = await Factory.model('App/Models/User').make()
  user.email = email
  user.password = password
  const result = await user.save()
  assert.notEqual(user.password, password, `result: ${result}`)
})
