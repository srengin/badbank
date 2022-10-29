import React from "react";
import App from './components/App.js';
import { createRoot } from 'react-dom/client';
import 'bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


import ReactDOM from 'react-dom'

import { Router, Route, BrowserRouter, NavLink } from 'react-router'


if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
  }

//const container = document.getElementById('root');
//const root = createRoot(container); 
//root.render(<App />);

createRoot(
    document.getElementById("root"),
  )
  .render(
    < App />
  );