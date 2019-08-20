import React from 'react'

import withFetchService from '../../services/withFetchService'
import { fetchs } from '../../state/concerts'
import TextField from '../../components/TextField'
import Button from '../../components/Button';

import CircularProgress from '@material-ui/core/CircularProgress';
import { Paper } from '@material-ui/core'
import MenuItem from '@material-ui/core/MenuItem';
import MuiTextField from '@material-ui/core/TextField';
import UploadButton from '../../components/UploadButton/UploadButton';

class AddForm extends React.Component {
  state = {
    formData: {
      band: '',
      date: '',
      description: '',
      genre: '',
      location: '',
      photo: '',
      ticketPrice: ''
    },
    errors: {
      band: false,
      date: false,
      description: false,
      genre: false,
      location: false,
      photo: false,
      ticketPrice: false

    }
  }

  clearInputs = () => {
    this.setState({
      formData: {
        band: '',
        date: '',
        description: '',
        genre: '',
        location: '',
        photo: '',
        ticketPrice: ''
      }
    })
  }

  changeHandler = (key) => {
    return (e) => {
      const formData = {
        ...this.state.formData,
        [key]: e.target.value.trim() ?
          e.target.value
          :
          e.target.value.trim()
      }
      this.setState({ formData })
    }
  }

  selectChangeHandler = (key) => {
    return (e) => {
      const formData = {
        ...this.state.formData,
        [key]: e.target.value.toLowerCase()
      }
      this.setState({ formData })
    }
  }

  onSendData = () => {
    this.props._addItem(this.state.formData)
    this.clearInputs()
  }

  errorHandler = (key, bool) => {
    const regexDate = /(^(((0[1-9]|1[0-9]|2[0-8])[/](0[1-9]|1[012]))|((29|30|31)[/](0[13578]|1[02]))|((29|30)[/](0[4,6,9]|11)))[/]([2][0])[1-2][0-9]$)|(^29[/]02[/](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)/
    const regexNumber = /^[0-9.,]+$/
    const regexLink = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/

    let isError = false
    if (bool) {
      isError = !this.state.formData[key]

      if (key === 'date') {
        isError = regexDate.test(this.state.formData[key]) ? false : true
      }
      if (key === "ticketPrice") {
        isError = regexNumber.test(this.state.formData[key]) ? false : true
      }
      if (key === 'photo') {
        isError = regexLink.test(this.state.formData[key]) ? false : true
      }
    }
    this.setState({
      errors: {
        ...this.state.errors,
        [key]: isError
      }
    })
  }

  render() {
    const formData = [
      { label: 'Band', functionArg: 'band', helperText: 'Please fill in before submitting!' },
      { label: 'Date: DD/MM/YYYY', functionArg: 'date', helperText: 'Invalid date format!' },
      { label: 'Description', functionArg: 'description', helperText: 'Please fill in before submitting!' },
      { label: 'Location', functionArg: 'location', helperText: 'Please fill in before submitting!' },
      { label: 'Photo', functionArg: 'photo', helperText: 'Please fill in a valid url!' },
      { label: 'Ticket price', functionArg: 'ticketPrice', helperText: 'Please fill in a number!' }
    ]

    const arrayOfGenres = ['Pop', 'Rock', 'Jazz', 'Disco-Polo', 'Hip-Hop', 'Metal', 'Classical']

    const { band, date, description, genre, location, photo, ticketPrice } = this.state.formData
    const inputsFilled = band && date && description && genre && location && photo && ticketPrice
    const isError = !inputsFilled || this.state.errors.band || this.state.errors.date ||
      this.state.errors.description || this.state.errors.genre || this.state.errors.location ||
      this.state.errors.photo || this.state.errors.ticketPrice

    const styles = {
      paper: { maxWidth: '700px', padding: '30px', margin: '10px auto' },
      select: { maxWidth: '600px', alignSelf: 'center' },
      form: { display: 'flex', flexDirection: 'column' },
      progress: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'gray',
        opacity: 0.7,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10000
      }
    }
    return (
      <Paper style={styles.paper}>
        <form style={styles.form}>
          {this.props._isFetching ? <div style={styles.progress}><CircularProgress size={80} /></div> : null}
          {formData.map(elem => (
            <TextField
              key={elem.label}
              helperText={this.state.errors[elem.functionArg] ? elem.helperText : ''}
              error={this.state.errors[elem.functionArg]}
              value={this.state.formData[elem.functionArg]}
              label={elem.label}
              changeHandler={this.changeHandler(elem.functionArg)}
              onBlur={() => this.errorHandler(elem.functionArg, true)}
            />
          ))}
          <MuiTextField
            select
            style={styles.select}
            fullWidth
            label="Music genre"
            value={this.state.formData.genre}
            onChange={this.selectChangeHandler('genre')}
            margin={'normal'}
          >
            {arrayOfGenres.map(genre => (
              <MenuItem key={genre} value={genre.toLowerCase()}>
                {genre}
              </MenuItem>
            ))}
          </MuiTextField>
          <Button
            color='primary'
            size='large'
            disabled={isError}
            handleOnClick={this.onSendData}
          />
        </form>
        <UploadButton />
      </Paper>
    )
  }
}

export default withFetchService('concerts', fetchs)(AddForm)
