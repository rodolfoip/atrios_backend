const { MissingParamError } = require('../../utils/errors')
const MongoHelper = require('../helpers/mongo-helper')
const { ObjectID } = require('mongodb')

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
    return await usabilityTestModel.findOne({ _id })
  }

  async findByName (name) {
    if (!name) {
      throw new MissingParamError('name')
    }
    const usabilityTestModel = await MongoHelper.getCollection('usability_tests')
    return await usabilityTestModel.findOne({ name })
  }

  async update (usabilityTestEntity) {
    const { _id, name, accessCode, prototypeLink, externalLink, tasks } = usabilityTestEntity
    if (!_id) {
      throw new MissingParamError('id')
    }
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
    const usabilityTest = await usabilityTestModel.findOneAndUpdate(
      {
        _id: new ObjectID(_id)
      },
      {
        $set: {
          name,
          accessCode,
          prototypeLink,
          externalLink,
          tasks
        }
      },
      {
        returnNewDocument: true
      }
    )
    return usabilityTest
  }
}
