import { Controller, HttpRequest, HttpResponse, LoadSurveyById } from '@/presentation/controllers/survey-result/load-survey-result/load-survey-result-controller-protocols'

export class LoadSurveyResultController implements Controller {
    constructor (private readonly loadSurveyById: LoadSurveyById) {}
    
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
        await this.loadSurveyById.loadById(httpRequest.params.surveysId)
        return Promise.resolve(null)
    }
}