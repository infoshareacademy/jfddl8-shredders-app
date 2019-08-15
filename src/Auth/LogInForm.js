import React from 'react'

import { Paper, TextField, Button, Typography } from '@material-ui/core'

const styles = {
  paper: {
    padding: 30,
    maxWidth: 320,
    textAlign: 'center'
  },
  button: {
    margin: 20
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

const LoginForm = props => {
  return (
    <div style={styles.div}>
      <Paper style={styles.paper}>
        <Typography variant={'h4'}>
          Please log in!
      </Typography>
        <TextField
          value={props.email}
          onChange={props.onInputChanged('email')}
          fullWidth
          label={"e-mail"}
        />
        <TextField
          value={props.password}
          onChange={props.onInputChanged('password')}
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
        <Button
          onClick={props.toggleForm}
          style={styles.button}
          variant={'contained'}
          color={'secondary'}
        >
          SIGN IN
      </Button>
      </Paper>
    </div>
  )
}

export default LoginForm