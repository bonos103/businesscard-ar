'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => ({ greeting: 'Hello world in JSON' }))

Route.group(() => {
  Route.get('user/check', 'UserController.check').middleware(['auth'])
  Route.post('user/refresh', 'UserController.refresh')
  Route.post('user/auth', 'UserController.auth').validator('User/AuthUser')
  Route.post('user/login', 'UserController.login').middleware(['guest'])
  Route.get('user/login/facebook', 'UserController.loginFacebook').middleware(['guest'])
  Route.get('user/login/facebook/callback', 'UserController.loginFacebookCallback').middleware(['guest'])
  Route.get('user/login/twitter', 'UserController.loginTwitter').middleware(['guest'])
  Route.get('user/login/twitter/callback', 'UserController.loginTwitterCallback').middleware(['guest'])
  Route.post('user/logout', 'UserController.logout')
  Route.resource('user', 'UserController').apiOnly().middleware(new Map([
    [['user.destroy'], ['auth']],
  ])).validator(new Map([
    [['user.store'], ['User/StoreUser']],
  ]))

  Route.resource('project', 'ProjectController').apiOnly().middleware(new Map([
    [['project.store', 'project.update'], ['auth']],
  ])).validator(new Map([
    [['project.store'], ['Project/StoreProject']],
  ]))
  Route.post('project/preview', 'ProjectController.storePreview').middleware(['auth'])

  Route.get('puppeteer', 'PuppeteerController.index')
}).prefix('api/v1').namespace('Api/v1')
