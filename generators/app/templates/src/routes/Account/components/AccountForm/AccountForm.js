import React, { PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'
import TextField from '../../../../components/TextField'
import classes from './AccountForm.scss'
import ProviderDataForm from '../ProviderDataForm/ProviderDataForm'

import { connect } from 'react-redux'
import { helpers } from 'redux-devshare'
const { pathToJS } = helpers

export const AccountForm = ({ account, handleSubmit, submitting }) => (
  <div className={classes['Account']}>
    <h4>Account</h4>
    <div>
      <Field
        name='username'
        component={TextField}
        label='Username'
      />
    </div>
    <div>
      <Field
        name='email'
        component={TextField}
        label='Email'
      />
    </div>
    <div>
      <h4>Linked Accounts</h4>
      {
        account.providerData &&
          <ProviderDataForm
            providerData={account.providerData}
          />
      }
    </div>
  </div>
)

AccountForm.propTypes = {
  account: PropTypes.shape({
    providerData: PropTypes.array
  }),
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool
}

const AccountReduxForm = reduxForm({
  form: 'Account'
})(AccountForm)

export default connect(({devshare}) => (
  {
    initialValues: pathToJS(devshare, 'profile'),
    account: pathToJS(devshare, 'profile')
  }
))(AccountReduxForm)
