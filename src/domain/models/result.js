module.exports = class Task {
  constructor (testId, orderTask, sus, affectGrid, timeTask, aborted, clicks) {
    this.testId = testId
    this.orderTask = orderTask
    this.sus = sus
    this.affectGrid = affectGrid
    this.timeTask = timeTask
    this.aborted = aborted
    this.clicks = clicks
  }
}
