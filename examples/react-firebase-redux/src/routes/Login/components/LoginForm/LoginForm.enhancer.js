import { reduxForm } from 'redux-form'
import { LOGIN_FORM_NAME } from 'constants/formNames'

export default reduxForm({
  form: LOGIN_FORM_NAME
})
