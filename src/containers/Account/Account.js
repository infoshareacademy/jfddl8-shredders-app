import React from 'react'

import { connect } from 'react-redux'
import { changePasswordAsyncActionCreator } from '../../state/auth'
import { addSnackbarActionCreator } from '../../state/snackbars'

import { Paper, Typography, TextField, Button, CircularProgress } from '@material-ui/core'

const styles = {
  changePassword: { textAlign: 'center', padding: 20 },
  inputs: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 200px',
    flexDirection: 'column'
  },
  input: {
    margin: 5
  },
  button: {
    margin: 15,
    width: 160
  }
}

class Account extends React.Component {
  state = {
    newPassword: '',
    newPassword2: '',
    newPasswordError: false,
    newPassword2Error: false,
    disabledInputs: false
  }

  onInputChanged = (input) => (evt) => this.setState({ [input]: evt.target.value })

  onPassword = () => {
    const firstInputFocus = () => this.setState({
      newPasswordError: false
    })

    const firstInputBlur = () => {
      if (this.state.newPassword.length < 8)
        this.setState({
          newPasswordError: true
        })
    }

    const secondInputFocus = () => this.setState({
      newPassword2Error: false
    })

    const secondInputBlur = () => {
      if (this.state.newPassword !== this.state.newPassword2)
        this.setState({
          newPassword2Error: true

        })
    }

    return {
      firstInputFocus,
      firstInputBlur,
      secondInputFocus,
      secondInputBlur
    }
  }

  onClick = () => {
    this.setState({
      disabledInputs: true
    })
    this.props._changePassword(this.state.newPassword)
      .then(data => {
        if (data.error) {
          return Promise.reject(data)
        }

        return data
      })
      .then(() => {
        this.setState({
          disabledInputs: false,
          newPassword: '',
          newPassword2: ''
        })
        this.props._addSnack('Password changed', 'green')
      })
      .catch(() => {
        this.props._addSnack('Please re-log and try again!', 'red')
      })
  }

  render() {
    const isDisabledButton = !(
      this.state.newPassword.length > 7 &&
      this.state.newPassword2.length > 7 &&
      this.state.newPassword === this.state.newPassword2
    )

    return (
      <Paper>
        <Typography style={styles.changePassword} variant={'h6'}>
          Change password:
        </Typography>
        <div style={styles.inputs}>
          <TextField
            value={this.state.newPassword}
            onChange={this.onInputChanged('newPassword')}
            onFocus={this.onPassword().firstInputFocus}
            onBlur={this.onPassword().firstInputBlur}
            style={styles.input}
            label={'new password'}
            fullWidth
            variant="outlined"
            type={'password'}
            error={this.state.newPasswordError}
            helperText={this.state.newPasswordError ? "Password must have 8 characters!" : ''}
            disabled={this.state.disabledInputs}
          />
          <TextField
            value={this.state.newPassword2}
            onChange={this.onInputChanged('newPassword2')}
            onFocus={this.onPassword().secondInputFocus}
            onBlur={this.onPassword().secondInputBlur}
            style={styles.input}
            label={'repeat new password'}
            fullWidth
            variant="outlined"
            type={'password'}
            error={this.state.newPassword2Error}
            helperText={this.state.newPassword2Error ? "Passwords must be the same!!" : ''}
            disabled={this.state.disabledInputs}
          />
          <Button
            style={styles.button}
            variant={'contained'}
            color={'primary'}
            disabled={isDisabledButton}
            onClick={this.onClick}
          >
            Submit
          </Button>
          {this.props._isFetching ? <CircularProgress /> : null}
        </div>
      </Paper>
    )
  }
}

const mapStateToProps = state => ({
  _isFetching: state.auth.isFetching
})

const mapDispatchToProps = dispatch => ({
  _changePassword: password => dispatch(changePasswordAsyncActionCreator(password)),
  _addSnack: (text, color) => dispatch(addSnackbarActionCreator(text, color))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Account)