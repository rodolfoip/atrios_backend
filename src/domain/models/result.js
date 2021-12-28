module.exports = class Task {
  constructor (_id, testId, tasks, sus = 0, affectGrid = 0) {
    this._id = _id
    this.testId = testId
    this.tasks = tasks
    this.sus = sus
    this.affectGrid = affectGrid
  }
}
