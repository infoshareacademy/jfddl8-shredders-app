import React from 'react'

import { Button as MuiButton } from '@material-ui/core/';

const Button = (props) => {
  const { color, size, handleOnClick } = props
  return (
    <MuiButton
      variant={'contained'}
      color={color}
      fullWidth
      size={size}
      onClick={handleOnClick}
    >
      SUBMIT
    </MuiButton>
  )
}

export default Button
