import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { checkConnection ,logout} from '../actions/UserAction'
import {Link} from "react-router-dom";

import "../style/css/header.css";
import logoImg from "../style/img/benefix-me.png"
import menuImg from "../style/img/btn-menu.png"
import backImg from "../style/img/btn-back.png"
import Profile from '../pages/Profile'


export class Header extends Component {

    state={
        mySidenav:"0",
        main:"0",
        isLogin:"",
        firstName:""
    }

    componentDidMount() {

    }

    goBack = async event  => {
        event.preventDefault()
        this.props.history.goBack()
    }

    openNav  = event =>{
        if(this.state.main === "0"){
            this.setState({mySidenav:'30%'})
            this.setState({main:'30%'})
        }else{
            this.setState({mySidenav:'0'})
            this.setState({main:'0'})
        }
        
        if( sessionStorage.getItem('auth') !== null ){
            let user = sessionStorage.getItem('auth'); 
            user = JSON.parse(user)
            console.log(user.firstName)
            this.setState({isLogin:user.firstName})
            this.setState({isLogin:true})
        }else{
            this.setState({isLogin:false})
        }

    }

    
    onLogOut = async event =>{
        this.props.logout()
        this.openNav()
    }

    render() {
        let isLogIn = this.props.loggedInUser !== null ? true :false  
        return (<div className="header">
            <div className="cont">

                <div className="back">
                    <a className="back-btn"  onClick ={this.goBack}>
                        <img className="back-img" href="#/"  src={backImg} alt ="img" ></img>
                    </a>
                </div>

                <div className="contein-img">
                    <img className="logo-img"  src={logoImg} alt ="img"></img>
                </div>
                <div className="nav">
                    <div className="menu-btn" >
                        <div id="mySidenav" style={{width:this.state.mySidenav}} className="sidenav">
                        <a  className="closebtn" onClick={this.openNav}>&times;</a>
                        {this.state.isLogin &&  <Link to="/Profile">פרופיל</Link>}
                        <Link to="/" onClick={this.openNav}>חיפוש</Link>
                        <Link to="/ContactAs" onClick={this.openNav}>צור קשר</Link>
                        <Link to="/AboutAs" onClick={this.openNav}>אודות </Link>
                        {! this.state.isLogin  &&<Link to="/" onClick={this.openNav}>התחבר </Link>}
                        {this.state.isLogin && <Link to="/" onClick={this.onLogOut}>התנתק </Link>}
                    </div>
                    <div id="main" style={{marginRight:this.state.main}}>
                        <a style= {{fontSize:'30px', cursor:'pointer' }} onClick={this.openNav}> <img className="menu-img" href="#/" src={menuImg} alt ="img"></img> </a>
                    </div>

                    </div>
                </div>


            </div>
        </div>)
    }
}
const mapStateToProps = state => ({
    loggedInUser: state.user.loggedInUser,
  });
  const mapDispatchToProps = {
    checkConnection,
    logout,
  };
  export default withRouter(connect(mapStateToProps, mapDispatchToProps) (Header))