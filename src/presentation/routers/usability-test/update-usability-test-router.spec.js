const { MissingParamError } = require('../../../utils/errors')
const { ServerError } = require('../../errors')
const UpdateUsabilityTestRouter = require('./update-usability-test-router')

const makeSut = () => {
  const updateUseCaseSpy = makeUpdateUseCaseSpy()
  const sut = new UpdateUsabilityTestRouter({ updateUseCase: updateUseCaseSpy })

  return {
    sut,
    updateUseCaseSpy
  }
}

const makeUpdateUseCaseSpy = () => {
  class UpdateUseCase {
    async update ({ _id, name, accessCode, prototypeLink, externalLink }) {
      this._id = _id
      this.name = name
      this.accessCode = accessCode
      this.prototypeLink = prototypeLink
      this.externalLink = externalLink
      return this.usabilityTest
    }
  }
  const updateUseCaseSpy = new UpdateUseCase()
  updateUseCaseSpy.usabilityTest = {
    _id: 'any_id',
    name: 'any_test',
    accessCode: 'any_accessCode',
    prototypeLink: 'any_prototypeLink',
    externalLink: 'any_externalLink'
  }
  return updateUseCaseSpy
}

const makeUpdateUseCaseWithError = () => {
  class UpdateUseCase {
    async update () {
      throw new Error()
    }
  }

  return new UpdateUseCase()
}

describe('Update usability test router', () => {
  test('should return 400 if no id is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {}
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toBe(new MissingParamError('id').message)
  })

  test('should return 400 if no name is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        _id: 'any_id'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toBe(new MissingParamError('name').message)
  })

  test('should return 400 if no accessCode is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        _id: 'any_id',
        name: 'any_test'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toBe(new MissingParamError('accessCode').message)
  })

  test('should return 400 if no prototypeLink is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        _id: 'any_id',
        name: 'any_test',
        accessCode: 'any_code'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toBe(new MissingParamError('prototypeLink').message)
  })

  test('should return 400 if no externalLink is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        _id: 'any_id',
        name: 'any_test',
        accessCode: 'any_code',
        prototypeLink: 'any_link'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toBe(new MissingParamError('externalLink').message)
  })

  test('should return 500 if no httpRequest is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.route()
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toBe(new ServerError().message)
  })

  test('should return 500 if httpRequest has no body', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.route({})
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toBe(new ServerError().message)
  })

  test('should call updateUseCase with correct params', async () => {
    const { sut, updateUseCaseSpy } = makeSut()
    const httpRequest = {
      body: {
        _id: 'any_id',
        name: 'any_test',
        accessCode: 'any_accessCode',
        prototypeLink: 'any_prototypeLink',
        externalLink: 'any_externalLink'
      }
    }
    await sut.route(httpRequest)
    expect(updateUseCaseSpy.usabilityTest._id).toBe(httpRequest.body._id)
    expect(updateUseCaseSpy.usabilityTest.name).toBe(httpRequest.body.name)
    expect(updateUseCaseSpy.usabilityTest.accessCode).toBe(httpRequest.body.accessCode)
    expect(updateUseCaseSpy.usabilityTest.prototypeLink).toBe(httpRequest.body.prototypeLink)
    expect(updateUseCaseSpy.usabilityTest.externalLink).toBe(httpRequest.body.externalLink)
  })

  test('should throw if invalid dependencies are provided', async () => {
    const sut = new UpdateUsabilityTestRouter()
    const httpRequest = {
      body: {
        _id: 'any_id',
        name: 'any_test',
        accessCode: 'any_accessCode',
        prototypeLink: 'any_prototypeLink',
        externalLink: 'any_externalLink'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toBe(new ServerError().message)
  })

  test('should throw if dependecy throws', async () => {
    const updateUseCase = makeUpdateUseCaseWithError()
    const sut = new UpdateUsabilityTestRouter({ updateUseCase })
    const httpRequest = {
      body: {
        _id: 'any_id',
        name: 'any_test',
        accessCode: 'any_accessCode',
        prototypeLink: 'any_prototypeLink',
        externalLink: 'any_externalLink'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toBe(new ServerError().message)
  })
})
