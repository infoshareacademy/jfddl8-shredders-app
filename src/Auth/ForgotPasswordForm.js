import React from 'react'
import { Paper, Typography, TextField, Button } from '@material-ui/core';

const styles = {
  paper: {
    padding: 30,
    maxWidth: 320,
    textAlign: 'center'
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
  },
  button: {
    margin: 20
  },
}

const sendPassword = (email) => {
  fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAY8yO-AihhNCdcOpVSDcqNWmXs7U5wdVU',
    {
      method: 'POST',
      body: JSON.stringify({
        requestType: 'PASSWORD_RESET',
        email
      })
    })
}

const ForgotPasswordForm = props => {

  return (
    <div style={styles.div}>
      <Paper style={styles.paper}>
        <Typography variant={'h4'}>
          Wpisz swój e-mail
      </Typography>
        <TextField
          value={props.email}
          onChange={props.onInputChanged('email')}
          onFocus={props.onLogIn().emailInputFocus}
          onBlur={props.onLogIn().emailInputBlur}
          fullWidth
          error={props.errors.wrongEmail}
          label={"E-mail"}
          helperText={props.errors.wrongEmail ? "Niepoprawny e-mail" : ''}
        />
        <Button
          style={styles.button}
          variant={'contained'}
          color={'primary'}
          onClick={() => {
            sendPassword(props.email)
            props.toggleSendedPassword()
          }}
          disabled={!(props.email.length > 0 && !props.errors.wrongEmail)}
        >
          Wyślij
      </Button>
        <Button
          style={styles.button}
          variant={'contained'}
          color={'secondary'}
          onClick={props.toggleForgotPassword}
        >
          Powrót
      </Button>
      </Paper>
    </div>
  )
}

export default ForgotPasswordForm
