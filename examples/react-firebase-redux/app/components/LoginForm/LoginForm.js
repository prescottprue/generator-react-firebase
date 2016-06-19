import React, {Component, PropTypes} from 'react'
import { Link } from 'react-router'
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'
import CircularProgress from 'material-ui/lib/circular-progress'
import Checkbox from 'material-ui/lib/checkbox'
import './LoginForm.scss'

const fieldStyle = { width: '80%' }
const buttonStyle = { width: '100%' }

export default class LoginForm extends Component {
  constructor (props) {
    super(props)
  }

  state = { errors:{ username: null, password: null } }

  static propTypes = {
    onLogin: PropTypes.func
  }

  /**
   * @function handleInputChange
   * @description Update the state with the values from the form inputs.
   * @fires context#setState
   */
   handleInputChange = (name, e) => {
     e.preventDefault();
     this.setState({
       [name]: e.target.value
     })
   }

  /**
  * @function handlePrivateChange
  * @description Store data in object instead of state
  */
  handlePrivateChange = (name, e) => {
    e.preventDefault()
    this[name] = e.target.value
  }

  handleLogin = e => {
    if (e && typeof e.preventDefault === 'function') e.preventDefault()
    const { username } = this.state
    if (!username || username == '') {
      return this.setState({
        errors: { username: 'Username required' }
      })
    }
    if (!this.password || this.password == '') {
      return this.setState({
        errors: { password: 'Password required' }
      })
    }
    const loginData = { username, password: this.password }
    if (this.props.onLogin) this.props.onLogin(loginData)
 }

  googleLogin = () => {
    this.props.onLogin('google')
  }

  render () {
    return (
      <form className="LoginForm" onSubmit={ this.handleLogin }>
        <TextField
          hintText="some@email.com"
          floatingLabelText="Username/Email"
          onChange={ this.handleInputChange.bind(this, 'username') }
          errorText={ this.state.errors.username }
          style={ fieldStyle }
        />
        <TextField
          hintText="password"
          floatingLabelText="Password"
          type="password"
          onChange={ this.handlePrivateChange.bind(this, 'password') }
          errorText={ this.state.errors.password }
          style={ fieldStyle }
        />
        <div className="LoginForm-Submit">
          <RaisedButton
            label="Login"
            primary={ true }
            type="submit"
            disabled={ this.props.account && this.props.account.isFetching}
            style={ buttonStyle }
          />
        </div>
        <div className="LoginForm-Options">
          <div className="LoginForm-Remember">
            <Checkbox
              name="remember"
              value="remember"
              label="Remember"
              labelStyle={{ fontSize: '.8rem' }}
            />
          </div>
          <Link className="LoginForm-Recover-Link" to="/recover">
          Forgot Password?
          </Link>
        </div>
      </form>
    )
  }
}
