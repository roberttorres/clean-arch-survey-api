import { HttpResponse, HttpRequest, Controller } from "../../presentation/protocols"
import { LogControllerDecorator } from "./log"

describe('LogController Decorator', () => {
  
  test('Should call controller handle', async () => {  
      class ControllerStub implements Controller {
        async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
          const httpResponse: HttpResponse = {
            statusCode: 200,
            body: {
              name: 'Rodrigo'
            }
          }
          return new Promise(resolve => resolve(httpResponse))
        }
      }
      const controllerStub = new ControllerStub()
      const sut = new LogControllerDecorator(controllerStub)
      const httpRequest = {
        body: {
          email: 'any_mail@mail.com',
          name: 'any_name',
          password: 'any_password',
          passwordConfirmation: 'any_password',
        }
      }
      await sut.handle(httpRequest)
    })      
})
