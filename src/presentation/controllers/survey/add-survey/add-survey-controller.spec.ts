import { HttpRequest, Validation, AddSurvey } from './add-survey-controller-protocols'
import { AddSurveyController } from './add-survey-controller'
import { badRequest, serverError, noContent } from '@/presentation/helpers/http/http-helper'
import MockDate from 'mockdate'
import { mockAddSurvey } from '@/presentation/test'

const mockRequest = (): HttpRequest => ({
    body: {
        question: 'any_question',
        answers: [{
            image: 'any_image',
            answer: 'any_answer'
        }],
        date: new Date()
    }
}) 

const makeValidation = (): Validation => {
    class ValidationStub implements Validation {
        validate (input: any): Error {
            return null
        }
    }
    return new ValidationStub()
}

type SutTypes = {
    sut: AddSurveyController,
    validationStub: Validation,
    addSurveyStub: AddSurvey,
}

const makeSut = (): SutTypes => {    
    const validationStub = makeValidation()   
    const addSurveyStub = mockAddSurvey()   
    const sut = new AddSurveyController(validationStub, addSurveyStub) 
    return {
        sut,
        validationStub,
        addSurveyStub
    }       
}

describe('AddSurvey Controller', () => {
    beforeAll(() => {
        MockDate.set('2020-1-1')
    })

    afterAll(() => {
        MockDate.reset()
    })
    test('Should call Validation wih correct values', async () => {
        const { sut, validationStub } = makeSut()
        const validateSpy = jest.spyOn(validationStub, 'validate')
        const httpRequest =  mockRequest()
        await sut.handle(httpRequest)
        expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
    })

    test('Should return 400 if Validation fails', async () => {
        const { sut, validationStub } = makeSut()
        jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
        const httpResponse = await sut.handle(mockRequest())
        expect(httpResponse).toEqual(badRequest(new Error()))
    })
    
    test('Should call AddSurvey wih correct values', async () => {
        const { sut, addSurveyStub } = makeSut()
        const addSpy = jest.spyOn(addSurveyStub, 'add')
        const httpRequest =  mockRequest()
        await sut.handle(httpRequest)
        expect(addSpy).toHaveBeenCalledWith(httpRequest.body)
    })

    test('Should return 204 on success', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(mockRequest())
        expect(httpResponse).toEqual(noContent())
    })

    test('Should return 500 if AddSurvey throws', async () => {
        const { sut, addSurveyStub } = makeSut()
        jest.spyOn(addSurveyStub, 'add').mockImplementationOnce(async () => { return Promise.reject(new Error()) })
        const httpResponse = await sut.handle(mockRequest())
        expect(httpResponse).toEqual(serverError(new Error()))
    })
})
