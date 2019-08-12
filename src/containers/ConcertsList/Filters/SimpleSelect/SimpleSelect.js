import React from 'react'
import { MenuItem, TextField } from '@material-ui/core'


const SimpleSelect = props => {
  return (

    <TextField
      id="standard-select-currency"
      select
      value={props.value}
      onChange={props.onChangeHandler}
      margin={window.innerWidth < 781 ? 'none' : "normal"}
      style={{ marginLeft: '20px', marginRight: '20px' }}
    >
      {['All', 'Pop', 'Rock', 'Jazz', 'Disco-Polo', 'Hip-Hop', 'Metal', 'Classical'].map(genre => (
        <MenuItem key={genre} value={genre.toLowerCase()}>{genre}</MenuItem>
      ))}
    </TextField>
  )
}

export default SimpleSelect