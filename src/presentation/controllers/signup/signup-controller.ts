import { HttpResponse, HttpRequest, Controller, AddAccount } from './signup-controller-protocols'
import { badRequest, serverError, ok } from '../../helpers/http/http-helper'
import { Validation } from '../../protocols/validation'
import { Authentication } from '../login/login-controller-protocols'
 
export class SignUpController implements Controller {
  
  constructor (
    private readonly addAccount: AddAccount,
    private readonly validation: Validation,
    private readonly authentication: Authentication
    ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }      

      const { name, email, password } = httpRequest.body  

      const account = await this.addAccount.add({
        name,
        email,
        password,
      })

      const accessToken = await this.authentication.auth({
        email,
        password
      })

      //return ok(account)
      return ok({ accessToken })
      

    } catch (error) {
      return serverError(error)
    }
  }
}