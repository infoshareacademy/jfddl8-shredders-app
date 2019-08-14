import React from 'react'

import { Button as MuiButton } from '@material-ui/core/';

const styles = {
  button: {
    display: 'flex',
    flexDirection: 'column',
    margin: '20px auto',
    maxWidth: '600px',
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
      fullWidth
      size={size}
      onClick={handleOnClick}
    >
      SUBMIT
    </MuiButton>
  )
}

export default Button
