import { badRequest, serverError, unauthorized, ok } from '@/presentation/helpers/http/http-helper'
import { HttpRequest, Validation } from './login-controller-protocols'
import { Authentication } from '@/domain/usecases/account/authentication'
import { LoginController } from './login-controller'
import { AuthenticationParams } from '@/domain/usecases/account/authentication'
import { mockAuthentication, mockValidation } from '@/presentation/test'

type SutTypes = {
  sut: LoginController
  authenticationStub: Authentication
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const authenticationStub = mockAuthentication()
  const validationStub = mockValidation()
  const sut = new LoginController(authenticationStub, validationStub)
  return {      
    sut,
    authenticationStub,
    validationStub
  }  
}

const mockRequest = (): HttpRequest => ({
    body: {
      email: 'any_email@mail.com',
      password: 'any_password'
    }
})


describe('Login Controller', () => {     
    test('Should call Authentication with correct values', async () => {  
      const { sut, authenticationStub } = makeSut()
      const authSpy = jest.spyOn(authenticationStub, 'auth')
      await sut.handle(mockRequest())      
      expect(authSpy).toHaveBeenCalledWith({
        email: 'any_email@mail.com',
        password: 'any_password',
      })
    }) 

    test('Should return 401 if invalid credentials are provided', async () => {  
      const { sut, authenticationStub } = makeSut()
      jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(Promise.resolve(null))     
      const httpResponse = await sut.handle(mockRequest())
      expect(httpResponse).toEqual(unauthorized())
    }) 

    test('Should return 500 if Authentication throws', async () => {  
      const { sut, authenticationStub } = makeSut()
      jest.spyOn(authenticationStub, 'auth').mockImplementationOnce(async () => { return Promise.reject(new Error()) })
      const httpResponse = await sut.handle(mockRequest())
      expect(httpResponse).toEqual(serverError(new Error()))
    }) 

    test('Should return 200 if valid credentials are provided', async () => {  
      const { sut } = makeSut()      
      const httpResponse = await sut.handle(mockRequest())
      expect(httpResponse).toEqual(ok({ accessToken: 'any_token' }))
    }) 

  })
