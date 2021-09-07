import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { LoadSurveysController } from '@/presentation/controllers/survey/load-surveys/load-surveys-controller'
import { MakeDbLoadSurveys } from '@/main/factories/usecases/survey/load-surveys/db-load-surveys'

export const MakeLoadSurveysController = (): Controller => {  
  const controller =  new LoadSurveysController(MakeDbLoadSurveys())
  return makeLogControllerDecorator(controller)
} 