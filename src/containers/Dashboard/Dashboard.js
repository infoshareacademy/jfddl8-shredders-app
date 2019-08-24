import React from 'react'

import { Typography } from '@material-ui/core';

const styles = {
  h2: {
    textAlign: 'center',
    margin: '20px auto',
    maxWidth: 1000
  },
  div: {
    maxHeight: 200,
    margin: '50px',
    display: 'flex',
    justifyContent: 'center'
  }
}

const Dashboard = (props) => (
  <div style={{ display: 'flex', flexDirection: 'column', margin: 'auto' }}>
    <div style={styles.h2}>
      <Typography variant={'h3'} style={styles.h2}>
        MusicTripper - zaplanuj swoją muzyczną podróż
      </Typography>
      <Typography variant={'h6'} style={styles.h2}>
        MusicTripper jest aplikacją umożliwiającą zaplanowanie twojego koncertowego tripa. Jest to niezawodni towarzysz podróży, dzięki któremu wszystkie najpotrzebniejsze informacje będą w jednym miejscu. Odkrywaj najciekawsze wydażenia muzyczne w Twojej okolicy. Zabierz swoich znajomych w niezapomnianą muzyczną podróż!
      </Typography>
    </div>
    <div style={styles.div}>

    </div>
  </div >
)

export default Dashboard
