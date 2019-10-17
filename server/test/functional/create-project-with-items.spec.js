'use strict'

const { test, trait } = use('Test/Suite')('Create Project With Items')

const Factory = use('Factory')

const ProjectFactory = Factory.model('App/Models/Project')
const UserFactory = Factory.model('App/Models/User')

trait('DatabaseTransactions')
trait('Test/ApiClient')
trait('Auth/Client')

test('can create project with items', async ({ client }) => {
  const user = await UserFactory.create()

  const { title } = await ProjectFactory.make()

  const data = {
    title,
    items: [
      { value: 'hoge' },
    ],
  }

  const response = await client
  .post('/api/v1/project')
  .loginVia(user, 'jwt')
  .send(data)
  .end()

  response.assertStatus(201)
  response.assertJSONSubset({
    title,
    user_id: user.id,
    items: [
      { value: 'hoge' },
    ],
  })
})
