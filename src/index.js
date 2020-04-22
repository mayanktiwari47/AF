import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import {HashRouter, Router, Route, Switch } from "react-router-dom";
import { createStore } from 'redux';
import "assets/scss/material-kit-react.scss?v=1.8.0";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
// pages for this product
import Components from "views/Components/Components.js";
import LandingPage from "views/LandingPage/LandingPage.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import UsedCars from "views/Components/UsedCars/UsedCars.js";
import SelectedCar from "views/Components/SelectedCar/SelectedCar.js";
import museo from './fonts/Museo/Museo.woff2';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Provider } from 'react-redux';
var hist = createBrowserHistory();
const museo2 = {
  fontFamily: 'MuseoW01-900',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 200,
  src: `
    local('MuseoW01-900'),
    local('MuseoW01-900'),
    url(${museo}) format('woff2')
  `,
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
};

const initialState = {
  carDetail: null
};

const theme = createMuiTheme({
  typography: {
    fontFamily: 'MuseoW01-900',
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [museo2],
      },
    },
  },
});

function reducer(state= [], action) {
  console.log('reducer: '+ JSON.stringify(state)+" Action: "+JSON.stringify(action));

  if(action.type==='selectedCar')
  return [...state, {carDetail:action.payload.value}];

  return state;
}

const store = createStore(reducer);
//store.dispatch({ type: "selectedCar" });
ReactDOM.render(


  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
  <Router history={hist}>
    <Switch>
      <Route path="/landing-page" component={LandingPage} />
      <Route path="/profile-page" component={ProfilePage} />
      <Route path="/login-page" component={LoginPage} />
      <Route exact path="/" component={Components} />
      <Route exact path="/used-cars" component={UsedCars} />
      <Route exact path="/selected-car" component={SelectedCar} />
    </Switch>
  </Router></Provider>
  </ThemeProvider>,
 
  document.getElementById("root")
);
