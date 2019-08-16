import React from 'react'

import { connect } from 'react-redux'
import { logInAsyncActionCreator, signInAsyncActionCreator } from '../state/auth'

import LogInForm from './LogInForm'
import SignInForm from './SignInForm'

class Auth extends React.Component {
  state = {
    email: '',
    password: '',
    password2: '',
    showSignInForm: false,
    signInInputError: {
      wrongEmail: false,
      shortPassword: false,
      notSamePassword: false
    },
    logInInputError: {
      wrongEmail: false
    }
  }

  onInputChanged = (input) => (evt) => this.setState({ [input]: evt.target.value })

  onLogIn = () => {
    const click = () => this.props._logIn(this.state.email, this.state.password)

    const emailInputFocus = () => this.setState({
      logInInputError: {
        ...this.state.logInInputError,
        wrongEmail: false
      }
    })

    const emailInputBlur = () => {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (!re.test(String(this.state.email).toLowerCase()))
        this.setState({
          logInInputError: {
            ...this.state.logInInputError,
            wrongEmail: true
          }
        })
    }

    return {
      click,
      emailInputFocus,
      emailInputBlur
    }
  }

  onSignIn = () => {
    const click = () => this.props._signIn(this.state.email, this.state.password)

    const emailInputFocus = () => this.setState({
      signInInputError: {
        ...this.state.signInInputError,
        wrongEmail: false
      }
    })

    const emailInputBlur = () => {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (!re.test(String(this.state.email).toLowerCase()))
        this.setState({
          signInInputError: {
            ...this.state.signInInputError,
            wrongEmail: true
          }
        })
    }


    const firstInputFocus = () => this.setState({
      signInInputError: {
        ...this.state.signInInputError,
        shortPassword: false
      }
    })

    const firstInputBlur = () => {
      if (this.state.password.length < 8)
        this.setState({
          signInInputError: {
            ...this.state.signInInputError,
            shortPassword: true
          }
        })
    }

    const secondInputFocus = () => this.setState({
      signInInputError: {
        ...this.state.signInInputError,
        notSamePassword: false
      }
    })

    const secondInputBlur = () => {
      if (this.state.password !== this.state.password2)
        this.setState({
          signInInputError: {
            ...this.state.signInInputError,
            notSamePassword: true
          }
        })
    }


    return {
      click,
      emailInputFocus,
      emailInputBlur,
      firstInputFocus,
      firstInputBlur,
      secondInputFocus,
      secondInputBlur
    }
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
                onSign={this.onSignIn}
                toggleForm={this.toggleForm}
                errors={this.state.signInInputError}
              />
              :
              <LogInForm
                email={this.state.email}
                password={this.state.password}
                onInputChanged={this.onInputChanged}
                onLogIn={this.onLogIn}
                toggleForm={this.toggleForm}
                errors={this.state.logInInputError}
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
  _logIn: (email, password) => dispatch(logInAsyncActionCreator(email, password)),
  _signIn: (email, password) => dispatch(signInAsyncActionCreator(email, password))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth)