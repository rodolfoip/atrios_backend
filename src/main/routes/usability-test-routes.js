const { adapt } = require('../adapters/express-router-adapter')
const CreateUsabilityTestComposer = require('../composers/create-usability-test.composer')
const FindUserRouterComposer = require('../composers/find-usability-test.composer')
const DeleteUsabilityTestComposer = require('../composers/remove-usability-test.composer')

module.exports = router => {
  router.post('/usability-test', (adapt(CreateUsabilityTestComposer.compose())))
  router.get('/usability-test', (adapt(FindUserRouterComposer.compose())))
  router.delete('/usability-test', (adapt(DeleteUsabilityTestComposer.compose())))
}
