import React from 'react'
import { IconButton } from '@material-ui/core'
import Favorite from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import TextField from '@material-ui/core/TextField'
import { Link } from 'react-router-dom'

import SimpleSelect from './SimpleSelect/SimpleSelect'

const styles = {
  filters: { display: 'flex', justifyContent: 'center' },
  filtersSM: { display: 'flex', justifyContent: 'center', flexDirection: 'column' }
}


const Filters = props => {
  return (
    <div style={window.innerWidth < 781 ? styles.filtersSM : styles.filters}>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 7 }}>
        <Link to={'/concerts-list'}>
          <IconButton onClick={props.toggleFavorite} color={'secondary'}  >
            {props.filters.isFavorite ? <Favorite /> : <FavoriteBorder color={'action'} />}
          </IconButton>
        </Link>
      </div>

      <SimpleSelect
        value={props.filters.genre}
        onChangeHandler={props.onChangeHanler('genre')}
      />

      <TextField
        label="Zespół"
        value={props.filters.band}
        onChange={props.onChangeHanler('band')}
        style={{ margin: '0 20px' }}
      />
      <TextField
        label="Lokalizacja"
        value={props.filters.location}
        onChange={props.onChangeHanler('location')}
        style={{ margin: '0 20px' }}
      />

      <TextField
        label="Data"
        value={props.filters.date}
        onChange={props.onChangeHanler('date')}
        style={{ margin: '0 20px' }}
      />

    </div>
  )
}

export default Filters

