import {inject, injectable} from 'tsyringe'

import User from '@modules/users/infra/typeorm/entities/User'

import AppError from '@shared/errors/AppError'
import IUsersRepository from '../repositories/IUsersRepository'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'

interface IRequest{
  name: string,
  email: string,
  password: string
}

@injectable()
class CreateUserService{
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
    ){}

    public async execute({ name, email, password}: IRequest): Promise<User> {

    const checkIfExists = await this.usersRepository.findByEmail(email)

    if(checkIfExists){
      throw new AppError('Email address already used. Try another one')
    }

    const hashPassword = await this.hashProvider.generateHash(password)

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashPassword
    })

    return user
  }
}

export default CreateUserService
