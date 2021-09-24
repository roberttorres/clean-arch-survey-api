import { Controller, HttpRequest, HttpResponse, LoadSurveyById } from '@/presentation/controllers/survey-result/load-survey-result/load-survey-result-controller-protocols'
import { InvalidParamError } from '@/presentation/errors'
import { forbidden, serverError } from '@/presentation/helpers/http/http-helper'

export class LoadSurveyResultController implements Controller {
    constructor (private readonly loadSurveyById: LoadSurveyById) {}
    
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const survey = await this.loadSurveyById.loadById(httpRequest.params.surveyId)
            if (!survey)
            {
                return forbidden(new InvalidParamError('surveyId'))
            }   
            return null 
        }   catch (error) {
            return serverError(error)
        }                
    }
}