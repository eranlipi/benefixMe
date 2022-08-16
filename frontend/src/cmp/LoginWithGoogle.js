import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { login } from '../actions/UserAction';

export class LoginWithGoogle extends Component {

  responseGoogle = (response) => {
 
  if (response.error != undefined){
    console.log('error ='+response.error);
    return;
  }else{
 
    console.log(response.profileObj);

    let email = response.profileObj.email
    let familyName = response.profileObj.familyName
    let givenName = response.profileObj.givenName
    let imageUrl = response.profileObj.imageUrl
    
  }

  }

  render(){
return ( <div className='googleBtn'>

    <GoogleLogin
    clientId="215672870123-cvqpvnk8ove1o0bneeqnouhfhra0lilv.apps.googleusercontent.com"
    buttonText="Login With Google"
    onSuccess={this.responseGoogle}
    onFailure={this.responseGoogle}
    cookiePolicy={'single_host_origin'}
    isSignedIn={true}
    />
  
    </div>
    )
  }
}

export default LoginWithGoogle