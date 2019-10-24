'use strict'

const { test, trait } = use('Test/Suite')('CreateProject')
const Factory = use('Factory')

const ItemFactory = Factory.model('App/Models/Item')
const ProjectFactory = Factory.model('App/Models/Project')
const UserFactory = Factory.model('App/Models/User')

trait('DatabaseTransactions')
trait('Test/ApiClient')
trait('Auth/Client')

test('can get project only owner', async ({ client }) => {
  const user = await UserFactory.create()
  const project = await ProjectFactory.create()
  const item = await ItemFactory.create()

  await project.user().associate(user)
  await item.project().associate(project)

  const response = await client
  .get(`/api/v1/project/${project.id}`)
  .loginVia(user, 'jwt')
  .end()

  response.assertStatus(200)
  response.assertJSONSubset({
    ...project.toJSON(),
    items: [
      item.toJSON(),
    ],
  })
})
