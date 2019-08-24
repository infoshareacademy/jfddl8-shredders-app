import React from 'react'
import { Paper, Typography, Button } from '@material-ui/core';

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

const SendedPassword = props => {
  return (
    <div style={styles.div}>
      <Paper style={styles.paper}>
        <Typography variant={'h5'}>
          Nowe hasło zostało wysłane. Sprawdź pocztę!
      </Typography>
        <Button
          style={styles.button}
          variant={'contained'}
          color={'primary'}
          onClick={() => {
            props.toggleForgotPassword()
            props.toggleSendedPassword()
          }}
        >
          Do logowania
      </Button>
      </Paper>
    </div>
  )
}

export default SendedPassword
