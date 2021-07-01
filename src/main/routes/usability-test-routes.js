const { adapt } = require('../adapters/express-router-adapter')
const CreateUsabilityTestComposer = require('../composers/create-usability-test.composer')
const FindUserRouterComposer = require('../composers/find-usability-test.composer')
const DeleteUsabilityTestComposer = require('../composers/remove-usability-test.composer')
const UpdateUserRouterComposer = require('../composers/update-usability-test.composer')

module.exports = router => {
  router.post('/usability-test', (adapt(CreateUsabilityTestComposer.compose())))
  router.get('/usability-test', (adapt(FindUserRouterComposer.compose())))
  router.put('/usability-test', (adapt(UpdateUserRouterComposer.compose())))
  router.delete('/usability-test', (adapt(DeleteUsabilityTestComposer.compose())))
}
