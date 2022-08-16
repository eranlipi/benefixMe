import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { signup ,getClubsList} from '../actions/UserAction';
import LogIn from './LogIn'
import { GoogleLogin } from 'react-google-login';
import '../style/css/Registration.css'
import Select from '../cmp/Select'

 class Registration extends Component{

     
     // componentWillUnmount() {
         //     console.log("componentWillUnmount")
         // }
         
    state= {
        
        googleId:"",
        firstName:"", 
        lastName:"",
        phone:"",
        email:"",
        password1:"",
        password2:"",
        selectedClubs:[],
        clubs:[],
        MatchingPasswords:true
        
    }


    componentDidMount() {
        console.log("comp -->> componentDidMount")
            this.getClubs()
    }


    getClubs = async ()  =>{
            await this.props.getClubsList()
            await this.setState({ clubs: this.props.clubs });
    }
    handleChange = async event => {
        if (event.key !== 'Enter') {
            switch(event.target.id) {
                case "firstName":
                   this.setState({ firstName: event.target.value });
                break;

                case "lastName":
                    this.setState({ lastName: event.target.value });
                break;

                case "phone":
                this.setState({ phone: event.target.value });
                break;

                case "email":
                    this.setState({ email: event.target.value });
                break;

                case "password1":
                    this.setState({ password1: event.target.value });
                    console.log("111",event.target)
                break;

                case "password2":
                    this.setState({ password2: event.target.value });
                break;
                default:

              }
        }

    };

    onRegistration = async event => {
        console.log(" event.type ", event.type )
        if (event.key === 'Enter' || event.type === 'click') {
            let  userString = {...(this.state)};
            delete userString.clubs
             
            userString  = JSON.stringify(this.state);
            const  user  = JSON.parse(userString);
            if (user.password1 === user.password2){

                if (user.firstName && user.lastName && user.password1 && user.email && user.phone ) {
                    console.log("user",user)
                    await this.props.signup(user);
                    if (this.props.loggedInUser !== null && this.props.loggedInUser.status === "OK"){
                        await this.props.history.push(`/`);
                    }
                }
            }else{
               await  this.setState({MatchingPasswords:false});
               console.log("passwords!!!1")
            }
        }
    }

    handleChangeSelected = async event => {
        if (event.target.value !== "-1"){

            let selectedObj  = {}
            selectedObj = this.props.clubs.filter(item =>{
                return item.name === event.target.value
            })
            this.setState({ selectedClubs: [...this.state.selectedClubs, selectedObj[0]] }) 
            this.setState({
                clubs: this.state.clubs.filter(item =>{ 
                    return  item.name !== event.target.value
                })
            })
        }
    }
    
    cencelSelecterClab = async event => {
        
        this.setState({
            selectedClubs: this.state.selectedClubs.filter(item =>{ 
               return  item.name !== event.target.id
             })
          })
        
        let selectedObj  = {}
        selectedObj = this.props.clubs.filter(item =>{
            return item.name === event.target.id
        })
        this.setState({ clubs: [...this.state.clubs, selectedObj[0]] }) 

    }


    responseGoogle = (response) => {
        this.setState(prevState => ({
            googleId:response.profileObj.googleId,
            firstName:response.profileObj.givenName,
            lastName:response.profileObj.familyName,
            email:response.profileObj.email,
        }));

    }

    render(){
        let passwordclasses="";
        let passwordMess="";
        if (!this.state.MatchingPasswords){
             passwordclasses = "error-password"
             passwordMess = "password-messages"
            }else {
            passwordclasses = "inputs-singup"
            passwordMess = "password-messages disply"
        }
        console.log(passwordMess);
        // let passwordclasses = !this.state.MatchingPasswords ? " error-password" : "inputs-singup"  
        // let x = 1 
        return (<div className= "container-registration">

                <div className = "head-registration">
                    <h4>שמחים להכיר </h4>
                </div>
                <div className = "registration-form">
                    <input className="inputs-singup" id="firstName" type='text' 
                            placeholder={"שם פרטי"} value={this.state.firstName }
                            onChange={this.handleChange} onKeyUp={this.onRegistration}>
                    </input>

                    <input className="inputs-singup" id="lastName" type='text' 
                            placeholder={"שם משפחה"} value={this.state.lastName } 
                            onChange={this.handleChange} onKeyUp={this.onRegistration}>
                    </input>

                    <input className="inputs-singup" id="phone" type='text' 
                            placeholder={"טלפון סלולרי"} value={this.state.phone } 
                            onChange={this.handleChange} onKeyUp={this.onRegistration}>
                    </input>

                    <input className="inputs-singup" id="email" type='text' 
                            placeholder={"מייל"} value={this.state.email }
                            onChange={this.handleChange} onKeyUp={this.onRegistration}>
                    </input>

                    <div className = "password-cont" >

                        <input className={passwordclasses} id="password1" type='password' 
                                placeholder={"סיסמה"} value={this.state.password1 }
                                onChange={this.handleChange} onKeyUp={this.onRegistration}>
                        </input>

                        <input className={passwordclasses} id="password2" type='password' 
                                placeholder={"סיסמה"} value={this.state.password2 }
                                onChange={this.handleChange} onKeyUp={this.onRegistration}>
                        </input>

                        <p className = {passwordMess} > הסיסמה לא זהה </p>
                    </div>
                    <Select/>

                    <button className="action-btn" onClick={this.onRegistration} >הרשם</button>

                </div>
        </div>)
    }

} 
const mapStateToProps = state => ({
    loggedInUser: state.user.loggedInUser,
    clubs: state.user.clubs,
  });

const mapDispatchToProps = {
    signup,
    getClubsList,
  };
  
export default  withRouter(connect(mapStateToProps, mapDispatchToProps)(Registration))

