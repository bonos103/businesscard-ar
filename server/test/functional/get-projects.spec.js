'use strict'

const { test, trait } = use('Test/Suite')('CreateProject')
const Factory = use('Factory')

const ProjectFactory = Factory.model('App/Models/Project')
const UserFactory = Factory.model('App/Models/User')

trait('DatabaseTransactions')
trait('Test/ApiClient')
trait('Auth/Client')

test('can get projects of user', async ({ client }) => {
  const user = await UserFactory.create()
  const project1 = await ProjectFactory.create()
  await ProjectFactory.create()

  await user.projects().save(project1)

  const response = await client
    .get('/api/v1/project')
    .loginVia(user, 'jwt')
    .end()

  response.assertStatus(200)
  response.assertJSONSubset([project1.toJSON()])
})
