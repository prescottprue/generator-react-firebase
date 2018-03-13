import { reduxForm } from 'redux-form'
import { formNames } from 'constants'

export default reduxForm({ form: formNames.<%= pascalEntityName %> })
