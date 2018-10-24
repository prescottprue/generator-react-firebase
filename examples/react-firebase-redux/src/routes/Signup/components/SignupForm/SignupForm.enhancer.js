import { reduxForm } from 'redux-form'
import { SIGNUP_FORM_NAME } from 'constants/formNames'

export default reduxForm({
  form: SIGNUP_FORM_NAME
})
