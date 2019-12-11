'use strict'

const path = require('path')

const { test, trait, after } = use('Test/Suite')('Uploader')
const Drive = use('Drive')
const Factory = use('Factory')
const Helpers = use('Helpers')
const Media = use('App/Models/Media')

const MediaFactory = Factory.model('App/Models/Media')

trait('DatabaseTransactions')

test('upload', async ({ assert }) => {
  const file = await Drive.get(Helpers.resourcesPath('assets/images/test/test.png'))
  const media = await Media.upload({
    file,
    name: 'name.png',
    dir: 'test',
    type: 'image/png',
    size: file.length,
  })
  assert.equal(await Drive.exists(Helpers.resourcesPath(path.join('upload', media.dir, media.name))), true, 'Not exist in storage')
})

test('get path', async ({ assert }) => {
  const media = await MediaFactory.make()
  assert.equal(media.toJSON().path, path.join('/upload', media.dir, media.name), 'unexpected path')
})

after(async () => {
  await Drive.delete(Helpers.resourcesPath('upload/test'))
})
