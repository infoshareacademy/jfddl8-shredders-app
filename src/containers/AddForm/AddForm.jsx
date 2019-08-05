import React from 'react'
import TextField from '@material-ui/core/TextField'

class AddForm extends React.Component {
  state = {
    formDate: {
      brand: null,
      date: null,
      description: null,
      location: null,
      ticketPrice: null
    }
  }

  changeHandler(evt, input) {
    this.setState({
      formDate: {
        ...this.state.formDate,
        [input]: evt.target.value
      }
    })
  }

  render() {
    return (
      <form noValidate autoComplete="off">
        <TextField
          id={'standard-name'}
          label={'Brand'}
          margin={'normal'}
          fullWidth
          onChange={evt => this.changeHandler(evt, 'brand')}
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
      </form>
    )
  }
}

export default AddForm
