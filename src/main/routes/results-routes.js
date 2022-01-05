const { adapt } = require('../adapters/express-router-adapter')
const AddResultComposer = require('../composers/result.composer')
const FindByIdRouterComposer = require('../composers/find-by-id-result.composer')
const FindByTestIdRouterComposer = require('../composers/find-by-test-id-result.composer')
const UpdateResultComposer = require('../composers/update-result.composer')
const AddTaskResultComposer = require('../composers/add-task-result.composer')

module.exports = router => {
  router.post('/result', (adapt(AddResultComposer.compose())))
  router.get('/result/:id', (adapt(FindByIdRouterComposer.compose())))
  router.get('/result/:testId', (adapt(FindByTestIdRouterComposer.compose())))
  router.put('/result', (adapt(UpdateResultComposer.compose())))
  router.put('/add-result', (adapt(AddTaskResultComposer.compose())))
}
