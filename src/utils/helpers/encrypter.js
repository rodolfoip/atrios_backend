const bcrypt = require('bcrypt')
const MissingParamError = require('../errors/missing-param-error')

module.exports = class Encrypter {
  async compare (value, hash) {
    const isValid = await bcrypt.compare(value, hash)
    if (!value) {
      throw new MissingParamError('value')
    }
    if (!hash) {
      throw new MissingParamError('hash')
    }
    return isValid
  }

  async encryptPassword (value, saltOrRounds) {
    if (!value) {
      throw new MissingParamError('value')
    }
    if (!saltOrRounds) {
      throw new MissingParamError('saltOrRounds')
    }

    return await bcrypt.hashSync(value, saltOrRounds)
  }
}
