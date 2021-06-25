jest.mock('bcrypt', () => ({
  isValid: true,
  hashedPassword: 'hashed_password',

  async compare (value, hash) {
    this.value = value
    this.hash = hash
    return this.isValid
  },

  async encryptPassword (value, saltOrRounds) {
    this.value = value
    this.saltOrRounds = saltOrRounds
    return this.hashedPassword
  },

  hashSync (value, saltOrRounds) {
    this.value = value
    this.saltOrRounds = saltOrRounds
    return this.hashedPassword
  }
}))

const bcrypt = require('bcrypt')
const MissingParamError = require('../errors/missing-param-error')
const Encrypter = require('./encrypter')

const makeSut = () => {
  return new Encrypter()
}

describe('Encrypter', () => {
  test('should return true if bcrypt compare true returns true', async () => {
    const sut = makeSut()
    const isValid = await sut.compare('any_value', 'hash_value')
    expect(isValid).toBe(true)
  })

  test('should return encrypted password when bcrypt encryptPassword is called', async () => {
    const sut = makeSut()
    const password = await sut.encryptPassword('hashed_password', 10)
    expect(password).toBe('hashed_password')
  })

  test('should return false if bcrypt returns false', async () => {
    const sut = makeSut()
    bcrypt.isValid = false
    const isValid = await sut.compare('any_value', 'hash_value')
    expect(isValid).toBe(false)
  })

  test('should call bcrypt compare with correct values', async () => {
    const sut = makeSut()
    await sut.compare('any_value', 'hash_value')
    expect(bcrypt.value).toBe('any_value')
    expect(bcrypt.hash).toBe('hash_value')
  })

  test('should call bcrypt encryptPassword with correct values', async () => {
    const sut = makeSut()
    await sut.encryptPassword('hashed_password', 10)
    expect(bcrypt.value).toBe('hashed_password')
    expect(bcrypt.saltOrRounds).toBe(10)
  })

  test('should compare throw if no params are provided', async () => {
    const sut = makeSut()
    expect(sut.compare()).rejects.toThrow(new MissingParamError('value'))
    expect(sut.compare('any_value')).rejects.toThrow(new MissingParamError('hash'))
  })

  test('should encryptPassword throw if no params are provided', async () => {
    const sut = makeSut()
    expect(sut.encryptPassword()).rejects.toThrow(new MissingParamError('value'))
    expect(sut.encryptPassword('hashed_password')).rejects.toThrow(new MissingParamError('saltOrRounds'))
  })
})
