const { adapt } = require('../adapters/express-router-adapter')
const CreateUsabilityTestComposer = require('../composers/create-usability-test.composer')
const FindUserRouterComposer = require('../composers/find-usability-test.composer')
const FindByIdRouterComposer = require('../composers/find-by-id-usability-test.composer')
const FindByNameRouterComposer = require('../composers/find-by-name-usability-test.composer')
const FindByAccessCodeRouterComposer = require('../composers/find-by-accesscode-usability-test.composer')
const DeleteUsabilityTestComposer = require('../composers/remove-usability-test.composer')
const UpdateUserRouterComposer = require('../composers/update-usability-test.composer')

module.exports = router => {
  router.post('/usability-test', (adapt(CreateUsabilityTestComposer.compose())))
  router.get('/usability-test/:userId', (adapt(FindUserRouterComposer.compose())))
  router.get('/usability-test/id', (adapt(FindByIdRouterComposer.compose())))
  router.get('/usability-test/name/:name', (adapt(FindByNameRouterComposer.compose())))
  router.get('/usability-test/accesscode/:accessCode', (adapt(FindByAccessCodeRouterComposer.compose())))
  router.put('/usability-test', (adapt(UpdateUserRouterComposer.compose())))
  router.delete('/usability-test', (adapt(DeleteUsabilityTestComposer.compose())))
}
