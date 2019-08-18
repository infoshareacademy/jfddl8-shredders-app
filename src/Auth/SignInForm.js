import React from 'react'

import { Paper, TextField, Button, Typography, CircularProgress } from '@material-ui/core'

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
  },
  progress: {
    width: 40,
    height: 40,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
}

const SignInForm = props => {
  const enableSubmit = (
    props.email.length > 0 &&
    props.password.length > 0 &&
    props.password2 === props.password &&
    !props.errors.wrongEmail &&
    !props.errors.shortPassword &&
    !props.errors.notSamePassword
  )

  return (
    <div style={styles.div}>
      <Paper style={styles.paper}>
        <Typography variant={'h4'}>
          Sign up
      </Typography>
        <TextField
          value={props.email}
          onChange={props.onInputChanged('email')}
          onFocus={props.onSign().emailInputFocus}
          onBlur={props.onSign().emailInputBlur}
          error={props.errors.wrongEmail}
          fullWidth
          label={"e-mail"}
          helperText={props.errors.wrongEmail ? "Wrong e-mail" : ''}
        />
        <TextField
          value={props.password}
          onChange={props.onInputChanged('password')}
          onFocus={props.onSign().firstInputFocus}
          onBlur={props.onSign().firstInputBlur}
          error={props.errors.shortPassword}
          fullWidth
          label={'password'}
          type={'password'}
          helperText={props.errors.shortPassword ? "Password must have 8 characters!" : ''}
        />
        <TextField
          value={props.password2}
          onChange={props.onInputChanged('password2')}
          onFocus={props.onSign().secondInputFocus}
          onBlur={props.onSign().secondInputBlur}
          error={props.errors.notSamePassword}
          fullWidth
          label={'repeat-password'}
          type={'password'}
          helperText={props.errors.notSamePassword ? "Passwords must be the same!" : ''}
        />
        <div style={styles.buttons}>
          <Button
            onClick={props.onSign().click}
            style={styles.button}
            variant={'contained'}
            color={'primary'}
            disabled={!(enableSubmit)}
          >
            SIGN UP
      </Button>
          <div style={styles.progress}>
            {props._isFetching ? <CircularProgress /> : null}
          </div>
          <Button
            onClick={props.toggleForm}
            style={styles.button}
            variant={'contained'}
            color={'secondary'}
          >
            LOG IN
      </Button>
        </div>
      </Paper>
    </div>
  )
}
export default SignInForm