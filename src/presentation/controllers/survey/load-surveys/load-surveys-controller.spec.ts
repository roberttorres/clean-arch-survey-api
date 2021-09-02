import { LoadSurveysController }  from './load-surveys-controller'
import { SurveyModel, LoadSurveys } from './load-surveys-controller-protocols' 
import { noContent, ok, serverError } from '../../../helpers/http/http-helper'
import MockDate from 'mockdate'

const makeFakeSurveys = (): SurveyModel[] => {
  return [{
    id: 'any_id',
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer',
    }],
      date: new Date()
  }, {
    id: 'other_id',
    question: 'other_question',
    answers: [{
      image: 'other_image',
      answer: 'other_answer',
    }],
      date: new Date()          
  }]
}

interface SutTypes {
  sut: LoadSurveysController,
  loadSurveyStub: LoadSurveys
}

const makeLoadSurveys = (): LoadSurveys => {
  class LoadSurveysStub implements LoadSurveys {
    async load (): Promise<SurveyModel[]> {
      return new Promise(resolve => resolve(makeFakeSurveys()))
    }
  }
  return new LoadSurveysStub() 
}

const makeSut = (): SutTypes => {
  const loadSurveyStub = makeLoadSurveys()
  const sut = new LoadSurveysController(loadSurveyStub)  
  return { 
    sut,
    loadSurveyStub
  }
}

describe('LoadSurveys Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadSurveys', async () => {
    const { sut, loadSurveyStub } = makeSut()    
    const loadSpy = jest.spyOn(loadSurveyStub, 'load')
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })

  test('Should return on success', async () => {
    const { sut } = makeSut()    
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(ok(makeFakeSurveys()))
  })

  test('Should return 204 if LoadSurveys returns empty', async () => {
    const { sut, loadSurveyStub } = makeSut()    
    jest.spyOn(loadSurveyStub, 'load').mockReturnValueOnce(new Promise(resolve => resolve([])))
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 500 if LoadSurvey throws', async () => {
      const { sut, loadSurveyStub } = makeSut()
      jest.spyOn(loadSurveyStub, 'load').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
      const httpResponse = await sut.handle({})
      expect(httpResponse).toEqual(serverError(new Error()))
  })
})