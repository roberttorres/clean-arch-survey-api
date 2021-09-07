import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { AddSurveyController } from '@/presentation/controllers/survey/add-survey/add-survey-controller'
import { MakeAddSurveyValidation } from './add-survey-validation-factory'
import { makeDbAddSurvey } from '@/main/factories/usecases/survey/add-survey/db-add-survey-factory'

export const MakeAddSurveyController = (): Controller => {  
  const controller =  new AddSurveyController(MakeAddSurveyValidation(), makeDbAddSurvey()) 
  return makeLogControllerDecorator(controller)
} 