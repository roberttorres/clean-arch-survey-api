import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { MakeAddSurveyController } from '../factories/controllers/survey/add-survey/add-survey-controller-factory'
import { MakeLoadSurveysController } from '../factories/controllers/survey/load-surveys/load-surveys-controller-factory'
import { adminAuth } from '../middlewares/admin-auth'
import { auth } from '../middlewares/auth'


export default (router: Router): void => {
  router.post('/surveys', adminAuth, adaptRoute(MakeAddSurveyController())) 
//router.post('/surveys', adaptRoute(MakeAddSurveyController()))
  router.get('/surveys', auth, adaptRoute(MakeLoadSurveysController()))


}
