module.exports = class UsabilityTest {
  constructor (_id, name, accessCode, prototypeLink, externalLink, tasks = []) {
    this._id = _id
    this.name = name
    this.accessCode = accessCode
    this.prototypeLink = prototypeLink
    this.externalLink = externalLink
    this.tasks = tasks
  }
}
