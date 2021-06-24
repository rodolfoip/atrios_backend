const { adapt } = require('../adapters/express-router-adapter')
const CreateUserRouterComposer = require('../composers/create-user-router.composer')

module.exports = router => {
  router.post('/user', adapt(CreateUserRouterComposer.compose()))
}
