import { LoadSurveyResult } from '@/domain/usecases/survey-result/load-survey-result'
import { Controller, HttpRequest, HttpResponse, LoadSurveyById } from '@/presentation/controllers/survey-result/load-survey-result/load-survey-result-controller-protocols'
import { InvalidParamError } from '@/presentation/errors'
import { forbidden, serverError } from '@/presentation/helpers/http/http-helper'

export class LoadSurveyResultController implements Controller {
    constructor (
        private readonly loadSurveyById: LoadSurveyById,
        private readonly loadSurveyResult: LoadSurveyResult
        ) {}
    
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { surveyId } = httpRequest.params
            const survey = await this.loadSurveyById.loadById(httpRequest.params.surveyId)
            if (!survey)
            {
                return forbidden(new InvalidParamError('surveyId'))
            }   
            await this.loadSurveyResult.load(surveyId)
            return null 
        }   catch (error) {
            return serverError(error)
        }                
    }
}