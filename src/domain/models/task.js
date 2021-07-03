module.exports = class Task {
  constructor (order, description, sus = 0, affectGrid = 0) {
    this.order = order
    this.description = description
    this.sus = sus
    this.affectGrid = affectGrid
  }
}
