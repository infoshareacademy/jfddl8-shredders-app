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
  const enableSubmit = (
    props.email.length > 0 &&
    props.password.length > 0 &&
    !props.errors.wrongEmail
  )

  return (
    <div style={styles.div}>
      <Paper style={styles.paper}>
        <Typography variant={'h4'}>
          Please log in!
      </Typography>
        <TextField
          value={props.email}
          onChange={props.onInputChanged('email')}
          onFocus={props.onLogIn().emailInputFocus}
          onBlur={props.onLogIn().emailInputBlur}
          error={props.errors.wrongEmail}
          fullWidth
          label={"e-mail"}
          helperText={props.errors.wrongEmail ? "Wrong e-mail" : ''}
        />
        <TextField
          value={props.password}
          onChange={props.onInputChanged('password')}
          fullWidth
          label={'password'}
          type={'password'}
        />
        <Button
          style={styles.button}
          variant={'contained'}
          color={'primary'}
          onClick={props.onLogIn().click}
          disabled={!enableSubmit}
        >
          LOG IN
      </Button>
        <Button
          onClick={props.toggleForm}
          style={styles.button}
          variant={'contained'}
          color={'secondary'}
        >
          SIGN UP
      </Button>
      </Paper>
    </div>
  )
}

export default LoginForm