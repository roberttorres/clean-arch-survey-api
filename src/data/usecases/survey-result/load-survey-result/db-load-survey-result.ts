import { LoadSurveyResultRepository } from '@/data/protocols/db/survey-result/load-survey-result-repository';
import { SurveyResultModel } from '@/domain/models/survey-result';
import { LoadSurveyResult } from '@/domain/usecases/survey-result/load-survey-result';
import surveyResultRoutes from '@/main/routes/survey-result-routes';

export class DbLoadSurveyResult implements LoadSurveyResult {
  constructor (private readonly loadSurveyResultRepository: LoadSurveyResultRepository) {}

  async load (surveyId: string): Promise<SurveyResultModel> {    
    await this.loadSurveyResultRepository.loadBySurveyId(surveyId)
    return null
  }
}