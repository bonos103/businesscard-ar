'use strict'

const { test, trait } = use('Test/Suite')('User')
const { validateAll } = use('Validator')
const Factory = use('Factory')
const User = use('App/Models/User')
const ValidatorStoreUser = use('App/Validators/User/StoreUser')

trait('Auth/Client')

test('cannot create user if no password', async ({ assert, client }) => {
  const { email } = await Factory.model('App/Models/User').make()
  const data = {
    email,
  }
  const validator = new ValidatorStoreUser()
  const validation = await validateAll(data, validator.rules)
  console.log(validation.messages())
  assert.isTrue(validation.fails())
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
