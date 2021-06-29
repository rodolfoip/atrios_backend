const { MissingParamError } = require('../../utils/errors')
const MongoHelper = require('../helpers/mongo-helper')

module.exports = class UsabilityTestRepository {
  async persist (usabilityTestEntity) {
    const { name, accessCode, prototypeLink, externalLink } = usabilityTestEntity
    if (!name) {
      throw new MissingParamError('name')
    }
    if (!accessCode) {
      throw new MissingParamError('accessCode')
    }
    if (!prototypeLink) {
      throw new MissingParamError('prototypeLink')
    }
    if (!externalLink) {
      throw new MissingParamError('externalLink')
    }

    const usabilityTestModel = await MongoHelper.getCollection('usability_tests')
    const usabilityTest = await usabilityTestModel.insertOne({ name, accessCode, prototypeLink, externalLink })
    return usabilityTest.ops[0]
  }
}
