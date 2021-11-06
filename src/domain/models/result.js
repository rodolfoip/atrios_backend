module.exports = class Task {
  constructor (testId, orderTask, timeTask, aborted, clicks, sus = 0, affectGrid = 0) {
    this.testId = testId
    this.orderTask = orderTask
    this.sus = sus
    this.affectGrid = affectGrid
    this.timeTask = timeTask
    this.aborted = aborted
    this.clicks = clicks
  }
}
