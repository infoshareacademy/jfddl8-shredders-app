import React from 'react'

import { Paper, TextField, Button, Typography } from '@material-ui/core'

const styles = {
  paper: {
    padding: 30,
    maxWidth: 320,
    textAlign: 'center'
  },
  button: {
    marginTop: 20
  },
  div: {
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw'
  }
}

const LoginForm = props => (
  <div style={styles.div}>
    <Paper style={styles.paper}>
      <Typography variant={'h4'}>
        Please log in!
      </Typography>
      <TextField
        value={props.email}
        onChange={props.onEmailChanged}
        fullWidth
        label={"e-mail"}
      />
      <TextField
        value={props.password}
        onChange={props.onPasswordChanged}
        fullWidth
        label={'password'}
        type={'password'}
      />
      <Button
        onClick={props.onLogInClick}
        style={styles.button}
        variant={'contained'}
        color={'primary'}
      >
        LOG IN
      </Button>
    </Paper>
  </div>
)

export default LoginForm