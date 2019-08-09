import React from 'react'

import CustomersLoginsChart from '../Chart/CustomersLoginsChart'
import CustomerSatisfactionChart from '../Chart/CustomerSatisfactionChart'

const Dashboard = (props) => (
  <div>
    <br />
    <br />
    <CustomerSatisfactionChart />
    <br />
    <br />
    <CustomersLoginsChart />

  </div>
)

export default Dashboard