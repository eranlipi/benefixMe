import UserService from '../services/UserService';
import { loading, doneLoading } from './SystemActions';
// import history from './../history';

export function login(credentails) {
  return async dispatch => {
    const user = await UserService.login(credentails);
    console.log("login",user)
    if (user.status === "OK" ){
      dispatch(_setUser(user));
    } 
  };
}

export function checkConnection() {
  return UserService.checkConnection();
}

export function getUserLoggedIn() {
  return async dispatch => {
    const user = await  UserService.getUserLoggedIn();
    
    dispatch(_setUser(user))
  }
  
}

export function signup(credentails) {
  return async dispatch => {
    const user = await UserService.signup(credentails);
    console.log("signup",user)
    if(user.status === "OK"){
      dispatch(_addUser(user));
    }
  };
}


export function saveUser(credentails) {
  return async dispatch => {
    const user = await UserService.saveEditedUser(credentails);
    console.log("saveUser",user)
    if(user.status === "OK"){
      dispatch(_setUser(credentails));
      // login(credentails)
    }
  };
}

export function  getClubsList () {
  return async dispatch => {
    const clubs = await UserService.getClubsList();
    dispatch(_addClubs(clubs));
  };
}
export function  addSelectedClubs (clubs) {
  return async dispatch => {
    // const clubs = await UserService.getClubsList();
    dispatch(_addSelectedClubs(clubs));
  };
}

export function logout() {
  return async dispatch => {
    await UserService.logout();
    dispatch(_setUser(null));
  };
}

export function getById() {
  return async dispatch => {
    try {
      dispatch(loading());
      const user = await UserService.getById();
      dispatch(_setUser(user));
    } catch (err) {
      // console.log('UserActions: ERROR in getById', err);
      // example for rerouting - after changing the store
      // history.push('/some/path');
    } finally {
      dispatch(doneLoading());
    }
  };
}

function _setUser(user) {
  return {
    type: 'SET',
    user,
  };
}

function _addUser(user) {
  return {
    type: 'ADD',
    user,
  };
}

function _addClubs(clubs){
  return {
    type:'ADD_CLUBS',
    clubs,
  }
}

function _addSelectedClubs(selectedClubs){
  return {
    type:'ADD_SELECTED_CLUBS',
    selectedClubs,
  }
}

export default {
  login,
  logout,
  signup,
  getById,
  getClubsList,
  checkConnection,
  getUserLoggedIn,
  addSelectedClubs,
};
