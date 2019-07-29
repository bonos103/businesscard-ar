'use strict'

const { test, trait } = use('Test/Suite')('User')
const { validateAll } = use('Validator')
const User = use('App/Models/User')
const ValidatorStoreUser = use('App/Validators/StoreUser')

trait('Auth/Client')

test('failed user creation', async ({ assert, client }) => {
  const data = {
    email: 'hoge@hoge.com'
  }
  const validation = await validateAll(data, ValidatorStoreUser.rules)
  console.log(ValidatorStoreUser)
  validation.fails((errorMessages) => {
    console.log(errorMessages)
  })
  assert.isTrue(validation.fails())
})
test('success user creation', async ({ assert }) => {
  const data = {
    email: 'hoge@hoge.com',
    password: 'hoge',
  }
  const validation = await validateAll(data, ValidatorStoreUser.rules)
  assert.isFalse(validation.fails())
})
