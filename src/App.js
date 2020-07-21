import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import NavBar from './components/NavBar'
import Landing from './components/Landing'
import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile'
import Questioniar from './components/Questioniar'
import NavBarProfile from './components/NavbarProfile'
import withSplashScreen from './components/withSplashScreen';
import Chat from './components/chat'
import Sidemenu from './components/Sidemenu'
import Status from './components/Status'
import Settings from './components/settings'
class App extends Component {
  
  render () {
    return (
      <Router>
       
        <div className="App">
      
       
        <Route exact path="/" component={NavBar} />
          <Route exact path="/" component={Landing} />
          <Route exact path="/withSplashScreen" component={withSplashScreen} />
          <Route exact path="/status" component={Sidemenu} />
          <Route exact path="/status" component={NavBarProfile} />
          <Route exact path="/profile" component={Sidemenu} />
          <Route exact path="/profile" component={NavBarProfile} />
          <Route exact path="/settings" component={Sidemenu} />
  
          <div className="container">
          <Route exact path="/chat" component={Chat} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/questioniar" component={Questioniar} />
            <Route exact path="/status" component={Status} />
            <Route exact path="/settings" component={Settings} />
           
          </div>
        </div>
      </Router>
    );
  }
}


export default withSplashScreen(App);