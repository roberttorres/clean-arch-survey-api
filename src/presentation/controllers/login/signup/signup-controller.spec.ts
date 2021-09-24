import { SignUpController } from './signup-controller'
import { EmailInUseError, MissingParamError, ServerError } from '@/presentation/errors'
import {  AccountModel, AddAccount, AddAccountParams, Validation, Authentication } from './signup-controller-protocols'
import { HttpRequest } from '@/presentation/protocols'
import { ok, serverError, badRequest, forbidden } from '@/presentation/helpers/http/http-helper'
import { mockAccountModel } from '@/domain/test'
import { mockAddAccount, mockAuthentication, mockValidation } from '@/presentation/test'

const mockRequest = (): HttpRequest => ({
  body: {
    name: 'valid_name',
    email: 'valid_email@mail.com',
    password: 'valid_password',
    passwordConfirmation: 'valid_password'
  } 
})

type SutTypes = {
  sut: SignUpController  
  addAccountStub: AddAccount
  validationStub: Validation
  authenticationStub: Authentication
}

const makeSut = (): SutTypes => {
    
  const authenticationStub = mockAuthentication()
  const addAccountStub = mockAddAccount()
  const validationStub = mockValidation()
  const sut = new SignUpController( addAccountStub, validationStub, authenticationStub)
  return {
    sut,    
    addAccountStub,
    validationStub,
    authenticationStub
  }

}

describe('SignUp Controller', () => {  
  test('Should return 500 if AddAccount throws', async () => {
    const {sut, addAccountStub } = makeSut()      
    const error = new Error()
    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(async () => {
      return Promise.reject(new Error())
    })  
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(error.stack)))
    /*expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError(error.stack)) */
  })

  test('Should call AddAccount with correct values', async () => {
    const {sut, addAccountStub } = makeSut()  
    const addSpy = jest.spyOn(addAccountStub, 'add')
    
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',        
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }      
    }  
  
    await sut.handle(mockRequest())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password',
    })
  }) 

  test('Should return 403 if AddAccount returns null', async () => {
    const { sut, addAccountStub } = makeSut()       
    jest.spyOn(addAccountStub, 'add').mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await sut.handle(mockRequest())    
    expect(httpResponse).toEqual(forbidden(new EmailInUseError()))    
  })
  
  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()     
  
    const httpResponse = await sut.handle(mockRequest())    
    expect(httpResponse).toEqual(ok({ accessToken: 'any_token' }))
    /*expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual(mockAccountModel()) */
  })

  test('Should call Validation with correct value', async () => {
    const { sut, validationStub } = makeSut()  
    const validateSpy = jest.spyOn(validationStub, 'validate')
    
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)           
  }) 

  test('Should return 400 if Validation returns an erro', async () => {
    const { sut, validationStub } = makeSut()       
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(mockRequest())    
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))    
  })
   
  test('Should call Authentication with correct values', async () => {  
    const { sut, authenticationStub } = makeSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    await sut.handle(mockRequest())      
    expect(authSpy).toHaveBeenCalledWith({
      email: 'valid_email@mail.com',
      password: 'valid_password',
    })
  }) 

  test('Should return 500 if Authentication throws', async () => {  
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockImplementationOnce(async () => { return Promise.reject(new Error()) })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  }) 
})