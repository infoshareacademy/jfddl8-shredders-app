import React from 'react'

import { Button as MuiButton } from '@material-ui/core/';

const Button = (props) => {
  return (
    <MuiButton
      variant={'contained'}
      color={props.color}
      fullWidth={props.fullWidth}
      size={props.size}
      onClick={props.onClick}
    >
      SUBMIT
    </MuiButton>
  )
}

export default Button
