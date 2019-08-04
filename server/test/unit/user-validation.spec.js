'use strict'

const { test, trait } = use('Test/Suite')('User')
const { validateAll } = use('Validator')
const Factory = use('Factory')
const ValidatorStoreUser = use('App/Validators/User/StoreUser')

trait('Auth/Client')

test('cannot create user if no password', async ({ assert }) => {
  const { email } = await Factory.model('App/Models/User').make()
  const data = {
    email,
  }
  const validator = new ValidatorStoreUser()
  const validation = await validateAll(data, validator.rules)
  const messages = validation.messages()
  assert.isTrue(validation.fails())
  assert.equal(messages[0] && messages[0].field, 'password')
})

test('cannot create user if no email', async ({ assert }) => {
  const { password } = await Factory.model('App/Models/User').make()
  const data = {
    password,
  }
  const validator = new ValidatorStoreUser()
  const validation = await validateAll(data, validator.rules)
  const messages = validation.messages()
  assert.isTrue(validation.fails())
  assert.equal(messages[0] && messages[0].field, 'email')
})

test('can create user if valid data', async ({ assert }) => {
  const { email, password } = await Factory.model('App/Models/User').make()
  const data = {
    email,
    password,
  }
  const validator = new ValidatorStoreUser()
  const validation = await validateAll(data, validator.rules)
  assert.isFalse(validation.fails())
})
