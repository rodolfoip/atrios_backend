module.exports = class Task {
  constructor (_id, testId, orderTask, timeTask, aborted, clicks, sus = 0, affectGrid = 0) {
    this._id = _id
    this.testId = testId
    this.orderTask = orderTask
    this.sus = sus
    this.affectGrid = affectGrid
    this.timeTask = timeTask
    this.aborted = aborted
    this.clicks = clicks
  }
}
