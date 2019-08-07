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

    return (
      <form noValidate autoComplete="off">
        <TextField
          value={this.state.formDate.band}
          label={'Band'}
          changeHandler={evt => this.changeHandler(evt, 'band')}
          handleKeyDown={this.onKeyDown}
        />
        <TextField
          value={this.state.formDate.date}
          label={'Date'}
          changeHandler={evt => this.changeHandler(evt, 'date')}
          handleKeyDown={this.onKeyDown}
        />
        <TextField
          value={this.state.formDate.description}
          label={'Description'}
          changeHandler={evt => this.changeHandler(evt, 'description')}
          handleKeyDown={this.onKeyDown}
        />
        <TextField
          value={this.state.formDate.genre}
          label={'Genre'}
          changeHandler={evt => this.changeHandler(evt, 'genre')}
          handleKeyDown={this.onKeyDown}
        />
        <TextField
          value={this.state.formDate.location}
          label={'Location'}
          changeHandler={evt => this.changeHandler(evt, 'location')}
          handleKeyDown={this.onKeyDown}
        />
        <TextField
          value={this.state.formDate.ticketPrice}
          label={'Ticket price'}
          changeHandler={evt => this.changeHandler(evt, 'ticketPrice')}
          handleKeyDown={this.onKeyDown}
        />
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
