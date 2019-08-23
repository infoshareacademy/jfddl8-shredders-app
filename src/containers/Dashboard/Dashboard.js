import React from 'react'

import CustomersLoginsChart from '../Charts/CustomersLoginsChart'
import CustomerSatisfactionChart from '../Charts/CustomerSatisfactionChart'
import { Typography } from '@material-ui/core';

const styles = {
  h2: {
    textAlign: 'center',
    margin: '50px auto',
    maxWidth: 1000
  },
  div: {
    margin: '50px',
    display: 'flex',
    justifyContent: 'center'
  }
}

const Dashboard = (props) => (
  <div style={{ display: 'flex', flexDirection: 'column', margin: 'auto' }}>
    <div style={styles.h2}>
      <Typography variant={'h2'} style={styles.h2}>
        MusicTripper - zaplanuj swoją muzyczną podróż
        </Typography>
      <Typography>
        MusicTripper jest aplikacją umożliwiającą zaplanowanie twojego koncertowego tripa. Jest to niezawodni towarzysz podróży, dzięki któremu wszystkie najpotrzebniejsze informacje będą w jednym miejscu. Odkrywaj najciekawsze wydażenia muzyczne w Twojej okolicy. Zabierz swoich znajomych w niezapomnianą muzyczną podróż!
        </Typography>
      <Typography> W naszej aplikacji możesz zrobić następujące rzeczy: </Typography>
      <Typography>Przeglądać wszystkie koncerty w całej Polsce;</Typography>
      <Typography>Dodawać interesujące Cię eventy do ulubionych;</Typography>
    </div>
    <div style={styles.div}>
      <CustomerSatisfactionChart />
      <CustomersLoginsChart />
    </div>
  </div >
)

export default Dashboard
