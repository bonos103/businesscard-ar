'use strict'

const { test, trait } = use('Test/Suite')('User Login')
const Factory = use('Factory')

const ItemFactory = Factory.model('App/Models/Item')
const UserFactory = Factory.model('App/Models/User')
const ProjectFactory = Factory.model('App/Models/Project')
const Item = use('App/Models/Item')
const User = use('App/Models/User')
const Project = use('App/Models/Project')

trait('DatabaseTransactions')
trait('Test/ApiClient')
trait('Auth/Client')

test('delete user', async ({ assert, client }) => {
  const user = await UserFactory.create()
  const project = await ProjectFactory.create()
  const item = await ItemFactory.create()

  await project.user().associate(user)
  await item.project().associate(project)

  const data = {
    ...project.toJSON(),
    items: [{
      ...item.toJSON(),
    }],
  }

  await client
    .put(`/api/v1/project/${project.id}`)
    .send(data)
    .loginVia(user, 'jwt')
    .end()

  const response = await client
    .delete(`/api/v1/user/${user.id}`)
    .loginVia(user)
    .end()


  console.log(response)

  const deletedUser = await User.find(user.id)
  const deletedProjct = await Project.find(project.id)
  // console.log(deletedUser.toJSON())
  // console.log(deletedProjct.toJSON())

  response.assertStatus(200)
  assert.notExists(deletedUser, 'User still exists')
  assert.notExists(deletedProjct, 'Project still exists')
}).timeout(6000)
