import React from 'react'
import { IconButton } from '@material-ui/core';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import TextField from '@material-ui/core/TextField';

import SelectButton from './SelectButton'
import SimpleSelect from './SimpleSelect/SimpleSelect';




const Filters = props => {
  return (
    <div style={props.style}>
      <IconButton onClick={props.toggleFavorite} color={'secondary'} style={{ margin: '0 10px' }}>
        {props.filters.isFavorite ? <Favorite /> : <FavoriteBorder color={'action'} />}
      </IconButton>

      {/* <SelectButton

        value={props.filters.genre}
        onChangeHandler={props.onChangeHanler('genre')}
      /> */}

      <SimpleSelect
        value={props.filters.genre}
        onChangeHandler={props.onChangeHanler('genre')}
      />

      <TextField
        label="Find Band or Performer"
        value={props.filters.band}
        onChange={props.onChangeHanler('band')}
        style={{ margin: '0 20px' }}
      />
      <TextField
        label="Find Location"
        value={props.filters.location}
        onChange={props.onChangeHanler('location')}
        style={{ margin: '0 20px' }}
      />

      <TextField
        label="Date"
        value={props.filters.date}
        onChange={props.onChangeHanler('date')}
        style={{ margin: '0 20px' }}
      />

    </div>
  )
}

export default Filters

