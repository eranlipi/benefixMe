
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { checkConnection ,getUserLoggedIn} from '../actions/UserAction'
// import { login } from '../actions/UserAction';
import LoginWithGoogle from '../cmp/LoginWithGoogle.js';

import UserMsg from '../cmp/UserMsg'
import Search from '../cmp/Search'
import Select from '../cmp/Select'
import LogIn from './LogIn'

import '../App.css';
import '../style/css/HomeApp.css';
	


 class HomeApp extends Component {



    getUserName =()=>{
        if( sessionStorage.getItem('auth') !== null ){

            let user = sessionStorage.getItem('auth'); 
            user = JSON.parse(user)
            return user.firstName;
         }
         return null 
    }


    render() {
       let isLogIn = checkConnection()
       let msg=isLogIn ?this. getUserName():"אורח";

        return (
            <div className = "home-app">
                <UserMsg className="msg-user" msg={msg}></UserMsg>
                <Search/>
                <Select/>
                {!isLogIn && <LoginWithGoogle/>}
                {!isLogIn && <LogIn/>}
               
                
            </div>
        )
    }
}

const mapStateToProps = state => ({
    loggedInUser: state.user.loggedInUser,
    clubs: state.user.clubs,
    selectedClubs: state.user.selectedClubs,
  });
  const mapDispatchToProps = {
    checkConnection,
    getUserLoggedIn,
  };

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (HomeApp))