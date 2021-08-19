import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return new Promise(resolve => resolve('any_token'))
  }
}))

describe('Jwt Adapter', () => {
  test('Should call sign with correct values', async () => {    
    const sut = new JwtAdapter('secret') 
    const signSpy = jest.spyOn(jwt, 'sign')
    await sut.encrypt('any_id')   
    expect(signSpy).toHaveBeenCalledWith({ id: 'any_id'} , 'secret')     
  })

  test('Should return a token on sign success', async () => {    
    const sut = new JwtAdapter('secret') 
    const accessToken = await sut.encrypt('any_id')
    expect(accessToken).toBe('any_token')
  })

  test('Should throw if sign throws', async () => {    
    const sut = new JwtAdapter('secret') 
    jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = await sut.encrypt('any_id')   
    await expect(promise).rejects.toThrow()
  })
})  

/* Neste arq de teste não é preciso saber como o jsonwebtoken funciona p/ conseguir testar.
A gente faz o mock dele e só quer garantir que o resultado do mock (jest.mock) 
seja o mesmo retornado pela sut -> (expect(accessToken).toBe('any_token'))*/
 