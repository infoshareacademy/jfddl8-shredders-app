import React from 'react'
import { BrowserRouter } from 'react-router-dom'


const Router = props => (
  <BrowserRouter>
    <div>
      {props.children}
    </div>
  </BrowserRouter>
)


export default Router
