const { MissingParamError } = require('../../utils/errors')

class AuthUseCase {
  constructor (loadUserByEmailRespositorySpy) {
    this.loadUserByEmailRespositorySpy = loadUserByEmailRespositorySpy
  }

  async auth (email, password) {
    if (!email) {
      throw new MissingParamError('email')
    }
    if (!password) {
      throw new MissingParamError('password')
    }
    await this.loadUserByEmailRespositorySpy.load(email)
  }
}

describe('Auth UseCase', () => {
  it('should return null if no email is provided', () => {
    const sut = new AuthUseCase()
    const promise = sut.auth()
    expect(promise).rejects.toThrow(new MissingParamError('email'))
  })

  it('should return null if no password is provided', () => {
    const sut = new AuthUseCase()
    const promise = sut.auth('any_email@mail.com')
    expect(promise).rejects.toThrow(new MissingParamError('password'))
  })

  it('should call LoadUserByEmailRespository with correct email', async () => {
    class LoadUserByEmailRespositorySpy {
      async load (email) {
        this.email = email
      }
    }
    const loadUserByEmailRespositorySpy = new LoadUserByEmailRespositorySpy()
    const sut = new AuthUseCase(loadUserByEmailRespositorySpy)
    await sut.auth('any_email@mail.com', 'any_password')
    expect(loadUserByEmailRespositorySpy.email).toBe('any_email@mail.com')
  })
})
