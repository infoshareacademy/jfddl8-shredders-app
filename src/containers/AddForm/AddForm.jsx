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

  changeHandler(evt, input) {
    const text = evt.target.value
    this.setState({
      formDate: {
        ...this.state.formDate,
        [input]: text
      }
    })
  }

  onSendData = (evt) => {
    evt.preventDefault()
    addConcertsToBase(this.state.formDate)
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
        />
        <TextField
          id={'standard-name'}
          label={'Date'}
          margin={'normal'}
          fullWidth
          onChange={evt => this.changeHandler(evt, 'date')}
        />
        <TextField
          id={'standard-name'}
          label={'Description'}
          margin={'normal'}
          fullWidth
          onChange={evt => this.changeHandler(evt, 'description')}
        />
        <TextField
          id={'standard-name'}
          label={'Location'}
          margin={'normal'}
          fullWidth
          onChange={evt => this.changeHandler(evt, 'location')}
        />
        <TextField
          id={'standard-name'}
          label={'Ticket price'}
          margin={'normal'}
          fullWidth
          onChange={evt => this.changeHandler(evt, 'ticketPrice')}
        />
        <Button color='primary' fullWidth size='large' onClick={evt => this.onSendData(evt)} />
      </form>

    )
  }
}

export default AddForm
