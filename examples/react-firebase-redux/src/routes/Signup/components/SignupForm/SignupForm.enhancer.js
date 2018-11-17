import { reduxForm } from 'redux-form'
import { SIGNUP_FORM_NAME } from 'constants/formNames'
import { withStyles } from '@material-ui/core/styles'
import styles from './SignupForm.styles'

export default compose(
  // Set prop-types used in HOCs
  setPropTypes({
    onSubmit: PropTypes.func.isRequired // called by handleSubmit
  }),
  // Add form capabilities (handleSubmit, pristine, submitting)
  reduxForm({
    form: SIGNUP_FORM_NAME
  }),
  // Add styles as props.classes
  withStyles(styles)
)
