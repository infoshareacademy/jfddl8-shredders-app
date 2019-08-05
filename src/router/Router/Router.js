import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'


const Router = props => (
  <BrowserRouter>
    <div>
      {props.children}
    </div>
  </BrowserRouter>
);


export default Router;
