import { MongoHelper } from '../helpers/mongo-helper'
import { AddSurveyModel } from '@/domain/usecases/survey/add-survey'
import { SurveyModel } from '@/domain/models/survey'
import { AddSurveyRepository } from '@/data/usecases/survey/add-survey/db-add-survey-protocols';
import { LoadSurveysRepository } from '@/data/protocols/db/survey/load-surveys-repository';

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository {
  async add (surveyData: AddSurveyModel): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.insertOne(surveyData)
  }

  async loadAll (): Promise<SurveyModel[]> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const surveys: SurveyModel[] = await surveyCollection.find().toArray()
    return MongoHelper.mapCollection(surveys)
  }
  
  async loadById (id: string): Promise<SurveyModel> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const survey = await surveyCollection.findOne({ _id: id })
    return survey && MongoHelper.map(survey)
  }
}  