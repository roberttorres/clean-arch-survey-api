import { SurveyModel } from "@/domain/models/survey";

/*export interface AddSurveyModel {
  question: string
  answers: SurveyAnswerModel[]
  date: Date
}*/

export type AddSurveyModel = Omit<SurveyModel, 'id'>

export interface AddSurvey {
  add (data: AddSurveyModel): Promise<void>
}