import '../style/css/LogIn.css'
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { login } from '../actions/UserAction';
import '../style/css/Registration.css';


// import '../style/css/Registration.css'

 class LogIn extends Component {

    state={
        email:"",
        password:""
    }

    handleChange = async event => {
        if (event.key !== 'Enter') {

            switch(event.target.id) {
                case "email":
                   this.setState({ email: event.target.value });
                break;

                case "password":
                    this.setState({ password: event.target.value });
                break;
                default:

              }
        }

    };

    onLogin = async event => {
        if (event.key === 'Enter' || event.type === 'click') {
            let  userString  = JSON.stringify(this.state);
            const  user  = JSON.parse(userString);
        //    console.log(user) 
            // delete user.modalIsOpen;
            if (user.email && user.password ) {
              await this.props.login(user);
              await this.isLogInSecc(user)
            }


        }
    }
    isLogInSecc =(user)=>{
        if(this.props.loggedInUser){
            console.log("user->",user)
            this.props.history.push(`/`);
        }

    }

    render(){
        return (
                <div className = "logIn-form">
                <input dir="rtl" className="inputs" id="email" type='text' 
                        placeholder={"שם משתמש"} value={this.state.firstName }
                        onChange={this.handleChange} onKeyUp={this.onLogin}>
                </input>
                
                <input dir="rtl" className="inputs" id="password" type='password' 
                        placeholder={"סיסמה"} value={this.state.password }
                        onChange={this.handleChange} onKeyUp={this.onLogin}>
                </input>

                <button className="action-btn" onClick={this.onLogin} >התחבר</button> 

             </div>
        )
    }

}

const mapStateToProps = state => ({
    loggedInUser: state.user.loggedInUser,
  });

const mapDispatchToProps = {
    login,
  };

  export default  withRouter(connect(mapStateToProps, mapDispatchToProps)(LogIn));
