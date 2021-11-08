const { adapt } = require('../adapters/express-router-adapter')
const AddResultComposer = require('../composers/result.composer')
const FindByIdRouterComposer = require('../composers/result.composer')

module.exports = router => {
  router.post('/result', (adapt(AddResultComposer.compose())))
  router.get('/result', (adapt(FindByIdRouterComposer.compose())))
}
