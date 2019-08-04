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
  Route.resource('user', 'UserController').apiOnly().validator(new Map([
    [['user.store'], ['User/StoreUser']],
  ]))
  Route.post('user/auth', 'UserController.auth').validator('User/AuthUser')
  Route.post('user/login', 'UserController.login').middleware(['guest'])
}).prefix('api/v1').namespace('Api/v1')
