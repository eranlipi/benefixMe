import '../style/css/Profile.css';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import userImg from "../style/img/user-img.png"
import Select from '../cmp/Select'
import { getUserLoggedIn,addSelectedClubs,saveUser} from '../actions/UserAction.js'
import UserService from '../services/UserService'

class Profile extends Component {
    state ={
        user:{},
        clubs:[],
        selectedClubs:[]
    }

    async componentDidMount() {
        await this.props.getUserLoggedIn()
        let user = JSON.parse(this.props.loggedInUser)
        this.setState({user:user})

    }

    onSave = async ()=>{
        let {user}= this.state
        user.selectedClubs = this.props.selectedClubs
        console.log("user",user);
        const resSave =await  this.props.saveUser(JSON.stringify(user)) 
        await console.log("resSave -> onSave -> ",resSave)
        //  if (resSave.status === "OK" ){
            this.props.history.push(`/`);
        //  }
        // UserService.saveEditedUser(user)
         
    }

    render() {
        console.log("state",this.state)
        return (
            <div className="main-prof-cont">
                <div className="prof-cont">
                    <img className="user-img" src={userImg}></img>
                    <input className="inputs" id="inputs" type='text' 
                        placeholder={"שם משתמש"} value={this.state.user.firstName}>
                    </input>
                    <input className="inputs" id="inputs" type='text' 
                        placeholder={"שם משפחה"} value={this.state.user.lastName}>
                    </input>
                    <input className="inputs" id="inputs" type='text' 
                        placeholder={"טלפון נייד"} value={this.state.user.phone}>
                    </input>
                    {this.state.user.phone && <Select/>}
                    <button className="action-btn" onClick={this.onSave} >שמור</button> 


                </div>
            </div>
            )
        }

}

const mapStateToProps = state => ({
    loggedInUser: state.user.loggedInUser,
    coupons: state.coupons,
    selectedClubs: state.user.selectedClubs,
  });
  const mapDispatchToProps = {
    getUserLoggedIn,
    addSelectedClubs,
    saveUser,

  };
export default withRouter(connect(mapStateToProps,mapDispatchToProps) (Profile))