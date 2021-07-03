const { adapt } = require('../adapters/express-router-adapter')
const CreateTaskComposer = require('../composers/create-task.composer')

module.exports = router => {
  router.post('/usability-test/task', (adapt(CreateTaskComposer.compose())))
}
