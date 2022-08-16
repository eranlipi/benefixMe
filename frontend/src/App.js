import "./App.css";
import React from 'react';
import { Component } from 'react';
import { HashRouter ,BrowserRouter , Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Header from './cmp/Header'
import HomeApp from './pages/HomeApp'
import CouponApp from './pages/CouponApp'
import WebViewApp from './pages/WebViewApp'
import Profile from './pages/Profile'
import Registration from './pages/Registration'
import ContactAs from './pages/ContactAs'
import AboutAs from './pages/AboutAs'
import Footer from './cmp/Footer'

const history = createBrowserHistory();

export default class App extends Component {
  render() {

    return (
      <React.Fragment >

        <BrowserRouter history={history}>
        <HashRouter>

            <Header />
            <Switch>
              <Route exact path='/' component={HomeApp}  ></Route>
              <Route path='/coupon/results/:results?' component={CouponApp}></Route>
              <Route exact path='/WebViewfrom/coupon/:coupon?' component={WebViewApp}  ></Route>
              <Route exact path='/WebViewfrom/registration' component={Registration}  ></Route>
              <Route exact path='/ContactAs' component={ContactAs}  ></Route>
              <Route exact path='/Profile' component={Profile}  ></Route>
              <Route exact path='/AboutAs' component={AboutAs}  ></Route>
              <Route>{'404'}</Route>
            </Switch>
            <Footer />

        </HashRouter>

        </BrowserRouter>
      </React.Fragment>
    );
  }
}
