import React from 'react'
import { MenuItem, TextField } from '@material-ui/core'


const SimpleSelect = props => {
  return (

    <TextField
      id="standard-select-currency"
      select
      value={props.value}
      onChange={props.onChangeHandler}
      margin="normal"
    >
      <MenuItem value={'all'}>All</MenuItem>
      <MenuItem value={'pop'}>Pop</MenuItem>
      <MenuItem value={'rock'}>Rock</MenuItem>
      <MenuItem value={'jazz'}>Jazz</MenuItem>
      <MenuItem value={'disco-polo'}>Disco-Polo</MenuItem>
      <MenuItem value={'hip-hop'}>Hip-Hop</MenuItem>
    </TextField>
  )
}

export default SimpleSelect