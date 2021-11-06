module.exports = class Task {
  constructor (order, description, sus = 0, affectGrid = 0, aborted = false) {
    this.order = order
    this.description = description
    this.sus = sus
    this.affectGrid = affectGrid
    this.aborted = aborted
  }
}
