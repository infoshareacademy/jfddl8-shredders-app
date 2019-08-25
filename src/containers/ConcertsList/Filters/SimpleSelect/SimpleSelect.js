import React from 'react'
import { MenuItem, TextField } from '@material-ui/core'


const SimpleSelect = props => {
  const style = props.style || { marginLeft: '20px', marginRight: '20px' }
  return (

    <TextField
      id="standard-select-currency"
      select
      fullWidth={props.fullWidth}
      value={props.value}
      helperText={props.helperText}
      onChange={props.onChangeHandler}
      margin={window.innerWidth < 781 ? 'none' : "normal"}
      style={style}
    >
      {['Wszystkie', 'Pop', 'Rock', 'Jazz', 'Disco-Polo', 'Hip-Hop', 'Metal', 'Classical'].map(genre => (
        <MenuItem key={genre} value={genre.toLowerCase()}>{genre}</MenuItem>
      ))}
    </TextField>
  )
}

export default SimpleSelect
