const { adapt } = require('../adapters/express-router-adapter')
const CreateUsabilityTestComposer = require('../composers/create-usability-test.composer')

module.exports = router => {
  router.post('/usability-test', (adapt(CreateUsabilityTestComposer.compose())))
}
