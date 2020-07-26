import {Request, Response} from 'express'
import {container} from 'tsyringe'

import AuthenticationService from '@modules/users/services/AuthenticateService'

export default class SessionsController{
  public async create(request: Request, response: Response): Promise<Response>{
    const {email, password} = request.body

    const authenticateUser = container.resolve(AuthenticationService)

    const {user, token} = await authenticateUser.execute({
      email,
      password
    })

    delete user.password

    return response.json({user, token})
  }
}
