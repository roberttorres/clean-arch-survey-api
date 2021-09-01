import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { MakeAddSurveyController } from '../factories/controllers/survey/add-survey/add-survey-controller-factory'
import { MakeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'
import { adaptMiddleware } from '../adapters/express-middleware-adapter'


export default (router: Router): void => {
  const adminAuth = adaptMiddleware(MakeAuthMiddleware('admin'))
  router.post('/surveys', adminAuth, adaptRoute(MakeAddSurveyController())) 
//router.post('/surveys', adaptRoute(MakeAddSurveyController()))

}
