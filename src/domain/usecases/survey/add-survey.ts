import { SurveyModel } from "@/domain/models/survey";

/*export interface AddSurveyParams {
  question: string
  answers: SurveyAnswerModel[]
  date: Date
}*/

export type AddSurveyParams = Omit<SurveyModel, 'id'>

export interface AddSurvey {
  add (data: AddSurveyParams): Promise<void>
}