import React from 'react'

import { connect } from 'react-redux'
import { logInAsyncActionCreator } from '../state/auth'

import LogInForm from './LogInForm'
import SignInForm from './SignInForm'

class Auth extends React.Component {
  state = {
    email: '',
    password: '',
    password2: '',
    showSignInForm: false
  }

  onInputChanged = (input) => (evt) => this.setState({ [input]: evt.target.value })

  onLogInClick = () => this.props._logIn(this.state.email, this.state.password)

  onSignInClick = () => {
    this.state.password === this.state.passowrd2 ? alert('ok') : alert('wrong password')
  }

  toggleForm = () => this.setState({ showSignInForm: !this.state.showSignInForm })

  render() {
    return (
      <div>
        {
          this.props._isUserLoggedIn ?
            this.props.children
            :
            this.state.showSignInForm ?
              <SignInForm
                email={this.state.email}
                password={this.state.password}
                password2={this.state.password2}
                onInputChanged={this.onInputChanged}
                onSignInClick={this.onSignInClick}
                toggleForm={this.toggleForm}
              />
              :
              <LogInForm
                email={this.state.email}
                password={this.state.password}
                onInputChanged={this.onInputChanged}
                onLogInClick={this.onLogInClick}
                toggleForm={this.toggleForm}
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