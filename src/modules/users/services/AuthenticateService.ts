import {sign} from 'jsonwebtoken'
import {inject, injectable} from 'tsyringe'

import IUsersRepository from '../repositories/IUsersRepository'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'

import authConfig from '@config/auth'
import AppError from '@shared/errors/AppError'
import User from '@modules/users/infra/typeorm/entities/User'

interface IRequest{
  email: string,
  password: string
}

interface IResponse{
  user: User,
  token: string
}

@injectable()
class AuthenticationService{
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
    ){}

  public async execute({email, password}: IRequest): Promise<IResponse> {

    const user = await this.usersRepository.findByEmail(email)

    if(!user){
      throw new AppError('This email/password is invalid', 401)
    }

    const passwordMatch = await this.hashProvider.compareHash(password, user.password)

    if(!passwordMatch){
      throw new AppError('This email/password is invalid', 401)
    }

    const {secret, expiresIn} = authConfig.jwt

    const token  = sign({}, secret,{
      subject: user.id,
      expiresIn
    })

    return {
      user,
      token
    }
  }
}

export default AuthenticationService
