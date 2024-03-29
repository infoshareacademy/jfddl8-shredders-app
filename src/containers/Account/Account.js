import React from 'react'

import { connect } from 'react-redux'
import { changePasswordAsyncActionCreator } from '../../state/auth'
import { addSnackbarActionCreator } from '../../state/snackbars'
import { fetchs } from '../../state/users'

import UploadButton from '../../components/UploadButton/UploadButton'
import fetchService from '../../state/fetchServiceDuck'
import { Box, Typography, TextField, Button, CircularProgress } from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle'


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
    width: 250
  },
  photoContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  photo: {
    maxWidth: 300,
    maxHeight: 300,
    width: '60%',
    borderRadius: '5px'
  }
}

class Account extends React.Component {
  state = {
    newPassword: '',
    newPassword2: '',
    newPasswordError: false,
    newPassword2Error: false,
    disabledInputs: false,
    image: ''
  }

  componentDidMount() {
    this.getUser()
  }

  getUser = () => {
    const imageUrl = 'https://jfddl8-shredders.firebaseio.com/users/' + this.props._userId + '.json?'
    fetchWithToken(imageUrl)
      .then(data => this.setState({
        image: data && data.photo
      }))

  }

  onInputChanged = (input) => (evt) => this.setState({ [input]: evt.target.value })

  uploadUserImage = (options) => {
    const imageUrl = 'https://jfddl8-shredders.firebaseio.com/users/' + this.props._userId
    fetchWithToken(imageUrl + '.json?', options)
      .then(() => this.props._getUser(imageUrl))
  }

  onImageChange = (event) => {
    let imageData = event.target.files[0]
    let reader = new FileReader()
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
        this.props._addSnack('Maksymalny rozmiar zdjęcia to 1MB!', 'red')
      }
    } else {
      this.props._addSnack('Zdjęcie musi być w formacie .jpg lub .png', 'red')
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
        this.props._addSnack('Hasło zostało zmienione.', 'green')
      })
      .catch(() => {
        this.props._addSnack('Wystąpił błąd, spróbuj ponownie.', 'red')
      })
  }

  render() {
    const isDisabledButton = !(
      this.state.newPassword.length > 7 &&
      this.state.newPassword2.length > 7 &&
      this.state.newPassword === this.state.newPassword2
    )

    return (
      <Box style={{ margin: '5px auto', borderRadius: '4px', padding: '20px' }} boxShadow={3}>
        <div style={styles.photoContainer}>
          {this.props._user && this.props._user.photo ?
            <img style={styles.photo} src={this.props._user.photo} alt='Profile img' />
            :
            <AccountCircle style={{ width: 200, height: 200 }} />
          }
        </div>
        <Typography style={styles.changePassword} variant={'h6'}>
          Zmiana hasła:
        </Typography>
        <div style={styles.inputs}>
          <TextField
            value={this.state.newPassword}
            onChange={this.onInputChanged('newPassword')}
            onFocus={this.onPassword().firstInputFocus}
            onBlur={this.onPassword().firstInputBlur}
            style={styles.input}
            label={'Nowe hasło'}
            fullWidth
            variant="outlined"
            type={'password'}
            error={this.state.newPasswordError}
            helperText={this.state.newPasswordError ? "Hasło musi zawierać przynajmniej 8 znaków!" : ''}
            disabled={this.state.disabledInputs}
          />
          <TextField
            value={this.state.newPassword2}
            onChange={this.onInputChanged('newPassword2')}
            onFocus={this.onPassword().secondInputFocus}
            onBlur={this.onPassword().secondInputBlur}
            style={styles.input}
            label={'Powtórz nowe hasło'}
            fullWidth
            variant="outlined"
            type={'password'}
            error={this.state.newPassword2Error}
            helperText={this.state.newPassword2Error ? "Hasła muszą być takie same!" : ''}
            disabled={this.state.disabledInputs}
          />
          <Button
            style={styles.button}
            variant={'contained'}
            color={'primary'}
            disabled={isDisabledButton}
            onClick={this.onClick}
          >
            Zmień hasło
          </Button>
          <UploadButton onImageChange={this.onImageChange} />
          <br />
          {this.props._isFetching ? <CircularProgress /> : null}
        </div>
      </Box>
    )
  }
}
const fetchWithToken = fetchService('', 'auth').fetchWithToken

const mapStateToProps = state => ({
  _isFetching: state.auth.isFetching,
  _userId: state.auth.userData.user_id,
  _user: state.users.data
})

const mapDispatchToProps = dispatch => ({
  _changePassword: password => dispatch(changePasswordAsyncActionCreator(password)),
  _addSnack: (text, color) => dispatch(addSnackbarActionCreator(text, color)),
  _getUser: (url) => dispatch(fetchs.getAsyncActionCreator(url))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Account)
