import React from 'react'
import { IconButton } from '@material-ui/core';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

const Filters = props => {
  return (
    <div style={props.style}>
      <IconButton onClick={props.toggleFavorite} color={'secondary'}>
        {props.isFavorite ? <Favorite /> : <FavoriteBorder color={'action'} />}
      </IconButton>
    </div>
  )
}

export default Filters