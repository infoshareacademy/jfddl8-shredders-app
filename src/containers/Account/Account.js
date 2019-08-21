import React from 'react'

import { connect } from 'react-redux'
import { changePasswordAsyncActionCreator } from '../../state/auth'
import { addSnackbarActionCreator } from '../../state/snackbars'
import UploadButton from '../../components/UploadButton/UploadButton'
import fetchService from '../../state/fetchServiceDuck'
import { Paper, Typography, TextField, Button, CircularProgress } from '@material-ui/core'

const styles = {
  changePassword: { textAlign: 'center', padding: 20 },
  inputs: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto',
    flexDirection: 'column',
    maxWidth: 400
  },
  input: {
    margin: 5
  },
  button: {
    margin: 15,
    width: 160
  },
  photoContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  photo: {
    maxWidth: 300,
    maxHeight: 300
  }
}

class Account extends React.Component {
  state = {
    newPassword: '',
    newPassword2: '',
    newPasswordError: false,
    newPassword2Error: false,
    disabledInputs: false,
    image: null
  }

  componentDidMount() {
    this.getUser()
  }

  getUser = () => {

    const imageUrl = 'https://jfddl8-shredders.firebaseio.com/users/' + this.props._userId + '.json?'
    fetchWithToken(imageUrl)
      .then(data => this.setState({
        image: data.photo
      }))

  }

  onInputChanged = (input) => (evt) => this.setState({ [input]: evt.target.value })

  uploadUserImage = (options) => {
    const imageUrl = 'https://jfddl8-shredders.firebaseio.com/users/' + this.props._userId + '.json?'
    fetchWithToken(imageUrl, options)
      .then(this.getUser)
  }

  onImageChange = (event) => {
    let imageData = event.target.files[0]
    let reader = new FileReader()
    console.log(imageData)
    if (!imageData) {
      return
    }
    reader.readAsDataURL(imageData)
    if (imageData.name.endsWith('.jpg') || imageData.name.endsWith('.png')) {
      if (imageData.size < 1048576) {
        reader.onload = (upload) => {
          this.uploadUserImage({
            method: 'PATCH',
            body: JSON.stringify({ photo: upload.target.result })
          })
        }
      } else {
        alert('Zbyt duży rozmiar zdjęcia! Maksymalnie 512 KB!')
      }
    } else {
      alert('Niepoprawny format zdjęcia! Tylko .jpg i .png')
    }
  }

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
      <Paper style={{ padding: '20px' }}>
        <div style={styles.photoContainer}>
          {this.state.image ? <img style={styles.photo} src={this.state.image} alt='Profile img' /> : null}
        </div>
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
          <UploadButton onImageChange={this.onImageChange} />
          <br />
          {this.props._isFetching ? <CircularProgress /> : null}
        </div>
      </Paper>
    )
  }
}
const fetchWithToken = fetchService('', 'auth').fetchWithToken

const mapStateToProps = state => ({
  _isFetching: state.auth.isFetching,
  _isFetching2: state.auth.isFetching,
  _userId: state.auth.userData.user_id
})

const mapDispatchToProps = dispatch => ({
  _changePassword: password => dispatch(changePasswordAsyncActionCreator(password)),
  _addSnack: (text, color) => dispatch(addSnackbarActionCreator(text, color))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Account)
