import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '../../components/Button';
import { addConcertsToBase } from '../../services/fetchService';

class AddForm extends React.Component {
  state = {
    formDate: {
      band: '',
      date: '',
      description: '',
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
    const { band, date, description, location, ticketPrice } = this.state.formDate

    return band.trim() && date.trim() && description.trim() && location.trim() && ticketPrice.trim()
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
          id={'standard-name'}
          label={'Band'}
          margin={'normal'}
          fullWidth
          onChange={evt => this.changeHandler(evt, 'band')}
          onKeyDown={this.onKeyDown}
        />
        <TextField
          value={this.state.formDate.date}
          id={'standard-name'}
          label={'Date'}
          margin={'normal'}
          fullWidth
          onChange={evt => this.changeHandler(evt, 'date')}
          onKeyDown={this.onKeyDown}
        />
        <TextField
          value={this.state.formDate.description}
          id={'standard-name'}
          label={'Description'}
          margin={'normal'}
          fullWidth
          onChange={evt => this.changeHandler(evt, 'description')}
          onKeyDown={this.onKeyDown}
        />
        <TextField
          value={this.state.formDate.location}
          id={'standard-name'}
          label={'Location'}
          margin={'normal'}
          fullWidth
          onChange={evt => this.changeHandler(evt, 'location')}
          onKeyDown={this.onKeyDown}
        />
        <TextField
          value={this.state.formDate.ticketPrice}
          id={'standard-name'}
          label={'Ticket price'}
          margin={'normal'}
          fullWidth
          onChange={evt => this.changeHandler(evt, 'ticketPrice')}
          onKeyDown={this.onKeyDown}
        />
        <Button
          color='primary'
          fullWidth size='large'
          onClick={this.preventEmptyString}
        />
      </form>

    )
  }
}

export default AddForm
