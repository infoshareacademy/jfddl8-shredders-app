import React from 'react'
import TextField from '../../components/TextField'
import Button from '../../components/Button';
import { addConcertsToBase } from '../../services/fetchService';

class AddForm extends React.Component {
  state = {
    formDate: {
      band: '',
      date: '',
      description: '',
      genre: '',
      location: '',
      ticketPrice: ''
    }
  }

  clearInputs = () => {
    this.setState({
      formDate: {
        band: '',
        date: '',
        description: '',
        genre: '',
        location: '',
        ticketPrice: ''
      }
    })
  }

  changeHandler(evt, input) {
    this.setState({
      formDate: {
        ...this.state.formDate,
        [input]: evt.target.value
      }
    })
  }

  onSendData = () => {
    addConcertsToBase(this.state.formDate)
    this.clearInputs()
  }

  checkInputs = () => {
    const { band, date, description, genre, location, ticketPrice } = this.state.formDate

    return band.trim() && date.trim() && description.trim() && genre.trim() && location.trim() && ticketPrice.trim()
  }

  preventEmptyString = (evt) => {
    this.checkInputs() ?
      this.onSendData(evt)
      :
      this.ifEmptyString()
  }

  ifEmptyString = () => {
    alert('Uzupełnij wszystkie pola formularza przed dodaniem !')
  }

  onKeyDown = e => {
    if (e.key === 'Enter') {
      this.preventEmptyString()
    }
  }

  render() {
    const formDate = [
      { label: 'Band', functionArg: 'band' },
      { label: 'Date', functionArg: 'date' },
      { label: 'Description', functionArg: 'description' },
      { label: 'Genre', functionArg: 'genre' },
      { label: 'Location', functionArg: 'location' },
      { label: 'Ticket price', functionArg: 'ticketPrice' }
    ]

    return (
      <form noValidate autoComplete="off">
        {formDate.map(elem => (
          <TextField
            key={elem.label}
            value={this.state.formDate[elem.functionArg]}
            label={elem.label}
            changeHandler={evt => this.changeHandler(evt, elem.functionArg)}
            handleKeyDown={this.onKeyDown}
          />
        ))}

        <Button
          color='primary'
          size='large'
          handleOnClick={this.preventEmptyString}
        />
      </form>
    )
  }
}

export default AddForm
