import { DbSaveSurveyResult } from './db-save-survey-result'
import { SaveSurveyResultRepository } from './db-save-survey-result-protocols'
import MockDate from 'mockdate'
import { throwError, mockSaveSurveyResultParams, mockSurveyResultModel } from '@/domain/test'
import { mockSaveSurveyResultRepository } from '@/data/test'

type SutTypes = {
    sut: DbSaveSurveyResult
    saveSurveyResultRepositoryStub: SaveSurveyResultRepository
}    

const makeSut = (): SutTypes => {  
    const saveSurveyResultRepositoryStub = mockSaveSurveyResultRepository()
    const sut = new DbSaveSurveyResult(saveSurveyResultRepositoryStub)
    return {
        sut,
        saveSurveyResultRepositoryStub
    }
}

describe('DbSaveSurveyResult UseCase', () => {
    beforeAll(() => {
        MockDate.set(new Date())
    })

    afterAll(() => {
        MockDate.reset()
    })

    test('Should call SaveSurveyResultRespository with correct values', async () => {
        const { sut, saveSurveyResultRepositoryStub } = makeSut()
        const saveSpy = jest.spyOn(saveSurveyResultRepositoryStub, 'save')
        const surveyResultData = mockSaveSurveyResultParams()
        await sut.save(surveyResultData)
        expect(saveSpy).toHaveBeenCalledWith(surveyResultData)
    })    

    test('Should throw if SaveSurveyResultRespository throws', async () => {
      const { sut, saveSurveyResultRepositoryStub } = makeSut()
      jest.spyOn(saveSurveyResultRepositoryStub, 'save').mockImplementationOnce(throwError)  
      const promise = sut.save(mockSaveSurveyResultParams())
      await expect(promise).rejects.toThrow()
    })

    test('Should return SurveyResult on success', async () => {
      const { sut } = makeSut()
      const surveyResult = await sut.save(mockSaveSurveyResultParams())
      expect(surveyResult).toEqual(mockSurveyResultModel())
    })
})    