const { MissingParamError } = require('../../utils/errors')
const MongoHelper = require('../helpers/mongo-helper')

module.exports = class UserRepository {
  async persist ({ name, email, password }) {
    if (!name) {
      throw new MissingParamError('name')
    }
    if (!email) {
      throw new MissingParamError('email')
    }
    if (!password) {
      throw new MissingParamError('password')
    }
    const userModel = await MongoHelper.getCollection('users')
    const user = await userModel.insertOne({
      name,
      email,
      password
    })
    return user.ops[0]
  }
}
