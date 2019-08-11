import React from 'react'

import TextField from '../../components/TextField'
import Button from '../../components/Button';
import { addConcertsToBase } from '../../services/fetchService';

class AddForm extends React.Component {
  state = {
    formData: {
      band: '',
      date: '',
      description: '',
      genre: '',
      location: '',
      ticketPrice: ''
    },
    errors: {
      band: false,
      date: false,
      description: false,
      genre: false,
      location: false,
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
        ticketPrice: ''
      }
    })
  }

  changeHandler(e, input) {
    this.setState({
      formData: {
        ...this.state.formData,
        [input]: (e.target.value.trim() ?
          e.target.value
          :
          e.target.value.trim()
        )
      }
    })
  }

  onSendData = () => {
    addConcertsToBase(this.state.formData)
    this.clearInputs()
  }

  errorHandler = (input, bool) => {
    const regexDate = /^\d\d[/]\d\d[/]\d\d\d\d$/
    const regexNumber = /^[0-9.,]+$/

    let isError = false
    if (bool) {
      isError = !this.state.formData[input]

      if (input === 'date') {
        isError = regexDate.test(this.state.formData[input]) ? false : true
      }

      if (input === "ticketPrice") {
        isError = regexNumber.test(this.state.formData[input]) ? false : true
      }
      if (input === "genre") {
        const genre = this.state.formData[input]
        isError = (
          genre === 'pop' || genre === 'rock' || genre === 'jazz' || genre === 'disco-polo' || genre === 'hip-hop') ?
          false
          :
          true
      }
    }
    this.setState({
      errors: {
        ...this.state.errors,
        [input]: isError
      }
    })
  }

  render() {
    const formData = [
      { label: 'Band', functionArg: 'band', helperText: 'Please fill in before submitting!' },
      { label: 'Date: DD/MM/YYYY', functionArg: 'date', helperText: 'Invalid date format!' },
      { label: 'Description', functionArg: 'description', helperText: 'Please fill in before submitting!' },
      { label: 'Genre: pop/rock/jazz/disco-polo/hip-hop', functionArg: 'genre', helperText: 'Please fill in a proper music genre!' },
      { label: 'Location', functionArg: 'location', helperText: 'Please fill in before submitting!' },
      { label: 'Ticket price', functionArg: 'ticketPrice', helperText: 'Please fill in a number!' }
    ]

    const { band, date, description, genre, location, ticketPrice } = this.state.formData
    const inputsFilled = band && date && description && genre && location && ticketPrice
    const isError = !inputsFilled || this.state.errors.band || this.state.errors.date ||
      this.state.errors.description || this.state.errors.genre || this.state.errors.location ||
      this.state.errors.ticketPrice

    return (
      <form>
        {formData.map(elem => (
          <TextField
            key={elem.label}
            helperText={this.state.errors[elem.functionArg] ? elem.helperText : ''}
            error={this.state.errors[elem.functionArg]}
            value={this.state.formData[elem.functionArg]}
            label={elem.label}
            changeHandler={e => this.changeHandler(e, elem.functionArg)}
            onBlur={() => this.errorHandler(elem.functionArg, true)}
          />
        ))}
        <Button
          color='primary'
          size='large'
          disabled={isError}
          handleOnClick={this.onSendData}
        />
      </form>
    )
  }
}

export default AddForm
