import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import Checkbox from 'material-ui/Checkbox'


import classes from './LoginForm.scss'



export const LoginForm = props => {
  const { handleSubmit } = props
  return (
    <form className={classes['container']} onSubmit={handleSubmit}>
      <div>
        <input placeholder='email' />
      </div>
      <div>
        <input placeholder='password' type='password' />
      </div>
      <div className={classes['submit']}>
        <RaisedButton
          label='Login'
          primary
          type='submit'
        />
      </div>
      <div className={classes['options']}>
        <div className={classes['remember']}>
          <Checkbox
            name='remember'
            value='remember'
            label='Remember'
            labelStyle={{ fontSize: '.8rem' }}
          />
        </div>
        <Link className={classes['recover']} to='/recover'>
          Forgot Password?
        </Link>
      </div>
    </form>
  )
}
LoginForm.propTypes = {
  handleSubmit: PropTypes.func
}

export default LoginForm
