const { adapt } = require('../adapters/express-router-adapter')
const CreateUsabilityTestComposer = require('../composers/create-usability-test.composer')
const DeleteUsabilityTestComposer = require('../composers/remove-usability-test.composer')

module.exports = router => {
  router.post('/usability-test', (adapt(CreateUsabilityTestComposer.compose())))
  router.delete('/usability-test', (adapt(DeleteUsabilityTestComposer.compose())))
}
