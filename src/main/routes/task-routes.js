const { adapt } = require('../adapters/express-router-adapter')
const CreateTaskComposer = require('../composers/create-task.composer')
const UpdateTaskComposer = require('../composers/update-task.composer')

module.exports = router => {
  router.post('/usability-test/task', (adapt(CreateTaskComposer.compose())))
  router.put('/usability-test/task', (adapt(UpdateTaskComposer.compose())))
}
