import { addFormGroup } from './FormGroup'

describe('FormGroup (Helper)', () => {
  describe('addFormGroup', () => {
    it('should return a function', () => {
      expect(typeof addFormGroup('test')).toBe('function')
    })
  })

  describe('withFormGroup', () => {
    it('should add the formGroup if one is configured', () => {
      const withFormGroup = addFormGroup('test')
      expect(withFormGroup('field')).toBe('test.field')
    })
    it('should just return the field name if no formGroup ("") is provided', () => {
      const withFormGroup = addFormGroup('')
      expect(withFormGroup('field')).toBe('field')
    })
  })
})
