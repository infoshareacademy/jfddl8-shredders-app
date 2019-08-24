import React from 'react'

import { Button as MuiButton } from '@material-ui/core/';

const styles = {
  button: {
    display: 'flex',
    flexDirection: 'column',
    margin: '20px auto',
    width: 250
  }
}

const Button = (props) => {
  const { color, disabled, size, handleOnClick } = props
  return (
    <MuiButton
      style={styles.button}
      variant={'contained'}
      color={color}
      disabled={disabled}
      size={size}
      onClick={handleOnClick}
    >
      Dodaj koncert
    </MuiButton>
  )
}

export default Button
