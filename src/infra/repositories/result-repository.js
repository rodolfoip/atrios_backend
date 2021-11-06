const { MissingParamError } = require('../../utils/errors')
const MongoHelper = require('../helpers/mongo-helper')
const { ObjectID } = require('mongodb')

module.exports = class UsabilityTestRepository {
  async persist (resultTestEntity) {
    const { testId, orderTask, sus, affectGrid, timeTask, aborted, clicks } = resultTestEntity
    if (!testId) {
      throw new MissingParamError('testId')
    }
    if (!orderTask) {
      throw new MissingParamError('orderTask')
    }
    if (!sus) {
      throw new MissingParamError('sus')
    }
    if (!affectGrid) {
      throw new MissingParamError('affectGrid')
    }
    if (!timeTask) {
      throw new MissingParamError('timeTask')
    }
    if (typeof aborted !== 'boolean') {
      throw new MissingParamError('aborted')
    }
    if (!clicks) {
      throw new MissingParamError('clicks')
    }

    const resultTestModel = await MongoHelper.getCollection('result_tests')
    const result = await resultTestModel.insertOne({ testId, orderTask, sus, affectGrid, timeTask, aborted, clicks })
    return result.ops[0]
  }

  async find () {
    let list = []
    const resultTestModel = await MongoHelper.getCollection('result_tests')
    list = await resultTestModel.find().toArray()
    return list
  }

  async findById (_id) {
    if (!_id) {
      throw new MissingParamError('_id')
    }
    const resultTestModel = await MongoHelper.getCollection('result_tests')
    return await resultTestModel.findOne({ _id: new ObjectID(_id) })
  }

  async findByTestId (testId) {
    if (!testId) {
      throw new MissingParamError('testId')
    }
    const resultTestModel = await MongoHelper.getCollection('result_tests')
    return await resultTestModel.findOne({ testId: new ObjectID(testId) })
  }

  async findByTask (testId, orderTask) {
    if (!testId) {
      throw new MissingParamError('testId')
    }
    if (!orderTask) {
      throw new MissingParamError('orderTask')
    }
    const resultTestModel = await MongoHelper.getCollection('result_tests')
    return await resultTestModel.findOne({ testId: new ObjectID(testId), orderTask })
  }
}
