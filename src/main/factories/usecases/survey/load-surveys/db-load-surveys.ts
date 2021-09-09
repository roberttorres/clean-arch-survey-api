import { SurveyMongoRepository } from "@/infra/db/mongodb/survey/survey-mongo-repository"
import { LoadSurveys } from "@/domain/usecases/survey/load-surveys"
import { DbLoadSurveys } from "@/data/usecases/survey/load-survey/db-load-surveys"

export const MakeDbLoadSurveys = (): LoadSurveys => {  
  const surveyMongoRepository =  new SurveyMongoRepository()
  return new DbLoadSurveys(surveyMongoRepository)
} 