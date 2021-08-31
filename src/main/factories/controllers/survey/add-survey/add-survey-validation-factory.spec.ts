import { MakeAddSurveyValidation } from './add-survey-validation-factory';
import { ValidationComposite, RequiredFieldValidation } from '../../../../../validation/validators'; 
import { Validation } from '../../../../../presentation/protocols/validation'; 

jest.mock('../../../../../validation/validators/validation-composite')


describe('AddsurveyValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {  
    MakeAddSurveyValidation()
    const validations: Validation[] = []
    for (const field of ['question','answers']) {
      validations.push(new RequiredFieldValidation(field))
    }
     expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})   