import React from 'react'

import { connect } from 'react-redux'
import { logInAsyncActionCreator } from '../state/auth'

import LoginForm from './LoginForm'

class Auth extends React.Component {
  state = {
    email: '',
    password: ''
  }

  onEmailChanged = evt => this.setState({ email: evt.target.value })

  onPasswordChanged = evt => this.setState({ password: evt.target.value })

  onLoginClick = () => this.props._logIn(this.state.email, this.state.password)

  render() {
    return (
      <div>
        {
          this.props._isUserLoggedIn ?
            this.props.children
            :
            <LoginForm
              email={this.state.email}
              password={this.state.password}
              onEmailChanged={this.onEmailChanged}
              onPasswordChanged={this.onPasswordChanged}
              onLogInClick={this.onLoginClick}
            />
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  _isUserLoggedIn: state.auth.isUserLoggedIn
})

const mapDispatchToProps = dispatch => ({
  _logIn: (email, password) => dispatch(logInAsyncActionCreator(email, password))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth)