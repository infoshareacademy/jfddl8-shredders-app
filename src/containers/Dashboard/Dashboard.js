import React from 'react'

import CustomersLoginsChart from '../Charts/CustomersLoginsChart'
import CustomerSatisfactionChart from '../Charts/CustomerSatisfactionChart'

import Typography from '@material-ui/core/Typography'

const styles = {
  h2: {
    display: 'flex',
    justifyContent: 'center'
  },
  div: {

  }
}

const Dashboard = (props) => (
  <div>
    <Typography variant='h4'
      style={
        styles.h2
      }>
      MusicTripper - zaplanuj swoją muzyczną podróż </Typography>
    <Typography
      style={
        styles.h2}
    > MusicTripper jest aplikacją umożliwiającą zaplanowanie twojego koncertowego tripa. Jest to niezawodny towarzysz podróży, dzięki któremu wszystkie najpotrzebniejsze informacje będą w jednym miejscu. Odkrywaj najciekawsze wydażenia muzyczne w Twojej okolicy. Zabierz swoich znajomych w niezapomnianą muzyczną podróż!</Typography>

    <Typography> W naszej aplikacji możesz zrobić następujące rzeczy:</Typography>
    <Typography variant={'subtitle1'}>
      <ul>
        <li>Przeglądać wszystkie koncerty w całej Polsce;</li>
        <li>Dodawać interesujące Cię eventy do ulubionych;</li>
      </ul>
      <br />
      <br />
      <CustomerSatisfactionChart />
      <br />
      <br />
      <CustomersLoginsChart />
    </Typography>
  </div >
)

export default Dashboard