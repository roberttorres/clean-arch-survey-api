import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { MakeAddSurveyController } from '../factories/controllers/survey/add-survey/add-survey-controller-factory'
import { MakeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'
import { adaptMiddleware } from '../adapters/express-middleware-adapter'
import { MakeLoadSurveysController } from '../factories/controllers/survey/load-surveys/load-surveys-controller-factory'


export default (router: Router): void => {
  const adminAuth = adaptMiddleware(MakeAuthMiddleware('admin'))
  const auth = adaptMiddleware(MakeAuthMiddleware())
  router.post('/surveys', adminAuth, adaptRoute(MakeAddSurveyController())) 
//router.post('/surveys', adaptRoute(MakeAddSurveyController()))
  router.get('/surveys', adaptRoute(MakeLoadSurveysController()))


}
