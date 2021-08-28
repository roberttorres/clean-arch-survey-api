import { MakeLoginValidation } from './login-validation-factory'
import { Controller } from '../../../../presentation/protocols'
import { LoginController } from '../../../../presentation/controllers/login/login/login-controller'
import { makeDbAuthentication } from '../../usecases/authentication/db-authentication-factory'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'

export const makeLoginController = (): Controller => {  
  const controller =  new LoginController(makeDbAuthentication(), MakeLoginValidation()) 
  return makeLogControllerDecorator(controller)
}