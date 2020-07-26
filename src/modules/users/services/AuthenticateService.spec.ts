import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import AuthenticateUser from './AuthenticateService'
import CreateUserService from './CreateUserService'
import AppError from '@shared/errors/AppError'

describe('AuthenticateUser', ()=>{
  it('should be able to authenticate', async ()=>{
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeHashProvider = new FakeHashProvider()

    const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider)
    const authenticateUser = new AuthenticateUser(fakeUsersRepository, fakeHashProvider)

    const user = await createUser.execute({
      name: 'John Snow',
      email: 'john@snow.wall',
      password: '123123'
    })

    const response =  await authenticateUser.execute({
      email: 'john@snow.wall',
      password: '123123'
    })

    expect(response).toHaveProperty('token')
    expect(response.user).toEqual(user)
  })

  it('should not be able to authenticate with wrong password', async ()=>{
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeHashProvider = new FakeHashProvider()

    const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider)
    const authenticateUser = new AuthenticateUser(fakeUsersRepository, fakeHashProvider)

   await createUser.execute({
      name: 'John Snow',
      email: 'john@snow.wall',
      password: '123123'
    })

    expect(authenticateUser.execute({
      email: 'john@snow.wall',
      password: 'wrong-password'
    })).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to authenticate with non existing user', async ()=>{
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeHashProvider = new FakeHashProvider()

    const authenticateUser = new AuthenticateUser(fakeUsersRepository, fakeHashProvider)

    expect(authenticateUser.execute({
      email: 'john@snow.wall',
      password: 'wrong-password'
    })).rejects.toBeInstanceOf(AppError)
  })
})
