const { MissingParamError } = require('../../utils/errors')
const MongoHelper = require('../helpers/mongo-helper')
const { ObjectID } = require('mongodb')

module.exports = class UsabilityTestRepository {
  async persist (usabilityTestEntity) {
    const { name, accessCode, prototypeLink, externalLink, userId, tasks } = usabilityTestEntity
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
    if (!userId) {
      throw new MissingParamError('userId')
    }
    if (!tasks) {
      throw new MissingParamError('tasks')
    }

    const usabilityTestModel = await MongoHelper.getCollection('usability_tests')
    const usabilityTest = await usabilityTestModel.insertOne({ name, accessCode, prototypeLink, externalLink, userId, tasks })
    return usabilityTest.ops[0]
  }

  async remove (id) {
    let isDeleted
    if (!id) {
      throw new MissingParamError('id')
    }

    const usabilityTestModel = await MongoHelper.getCollection('usability_tests')
    try {
      await usabilityTestModel.deleteOne({ _id: new ObjectID(id) })
      isDeleted = true
    } catch (error) {
      isDeleted = false
    }
    return isDeleted
  }

  async find () {
    let list = []
    const usabilityTestModel = await MongoHelper.getCollection('usability_tests')
    list = await usabilityTestModel.find().toArray()
    return list
  }

  async findById (_id) {
    if (!_id) {
      throw new MissingParamError('_id')
    }
    const usabilityTestModel = await MongoHelper.getCollection('usability_tests')
    return await usabilityTestModel.findOne({ _id: new ObjectID(_id) })
  }

  async findByName (name) {
    if (!name) {
      throw new MissingParamError('name')
    }
    const usabilityTestModel = await MongoHelper.getCollection('usability_tests')
    return await usabilityTestModel.findOne({ name })
  }

  async findByAccessCode (accessCode) {
    if (!accessCode) {
      throw new MissingParamError('accessCode')
    }
    const usabilityTestModel = await MongoHelper.getCollection('usability_tests')
    return await usabilityTestModel.findOne({ accessCode })
  }

  async update (usabilityTestEntity) {
    const { _id, name, prototypeLink, externalLink, tasks, quantity } = usabilityTestEntity
    if (!_id) {
      throw new MissingParamError('id')
    }
    if (!name) {
      throw new MissingParamError('name')
    }
    if (!prototypeLink) {
      throw new MissingParamError('prototypeLink')
    }
    if (!externalLink) {
      throw new MissingParamError('externalLink')
    }

    const usabilityTestModel = await MongoHelper.getCollection('usability_tests')
    const usabilityTest = await usabilityTestModel.findOneAndUpdate(
      {
        _id: new ObjectID(_id)
      },
      {
        $set: {
          name,
          prototypeLink,
          externalLink,
          tasks,
          quantity
        }
      },
      {
        returnNewDocument: true
      }
    )
    return usabilityTest
  }
}
