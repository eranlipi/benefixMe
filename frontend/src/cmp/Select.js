import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getClubsList,addSelectedClubs, checkConnection ,getUserLoggedIn} from '../actions/UserAction';

import '../style/css/select.css'

class Select extends Component {
    state= {
        selectedClubs:[],
        clubs:[],
        isLogIn:false
        
    }
    componentDidUpdate(prevProps,prevState) {
        // Typical usage (don't forget to compare props):
        
        let connection = checkConnection(); 
        if (connection !== prevState.isLogIn && connection === true ) {
            this.setState({isLogIn:true})
            let user = sessionStorage.getItem('auth'); 
            user = JSON.parse(user)
            if(user.selectedClubs !==null){
                this.setState({isLogin:user.firstName})
                if (user.selectedClubs){
                    
                    this.setState({selectedClubs:[...user.selectedClubs]})
                    // this.setState({isLogin:true})
                    this.props.addSelectedClubs([...user.selectedClubs]);
                    this.getClubs();

                    // this.handleStartChangeSelected();
                }
            }
        }else if (connection !== prevState.isLogIn && !this.props.loggedInUser ) {
            this.setState({isLogIn:false});
            this.setState({selectedClubs:[]});
            this.getClubs();

        }
    }
    
    componentDidMount() {

        console.log("componentDidMount")
        if(sessionStorage.getItem('auth')!==null){
            
            console.log("componentDidMount",sessionStorage.getItem('auth'))
            let user = sessionStorage.getItem('auth'); 
            user = JSON.parse(user)
            if(user.selectedClubs !==null){
                this.setState({isLogin:user.firstName})
                if (user.selectedClubs){
                    
                        // this.getClubs()
                        this.setState({selectedClubs:[...user.selectedClubs]})
                        this.setState({isLogin:true})
                        this.props.addSelectedClubs([...user.selectedClubs]);
                }
            }
        }else{
            this.getClubs()
        }
            
    }
        
        
    getClubs = async ()  =>{
            await this.props.getClubsList()
            await this.setState({ clubs: this.props.clubs });
            await this.handleStartChangeSelected()
    }
    
    handleStartChangeSelected = async() =>{
        if (this.state.selectedClubs.length > 0 ){

            var difference = [];
            let isClubExist = false ; 
            for(let i = 0 ; i < this.state.clubs.length ; i++ ){

                for(let j = 0 ;  j < this.state.selectedClubs.length ; j ++ ){
                    if (this.state.clubs[i].club_id === this.state.selectedClubs[j].club_id){
                        isClubExist = true;
                        break;
                    }
                }
                if (isClubExist === false ){
                    difference.push(this.state.clubs[i]);
                }
                isClubExist = false;
            }
            console.log( "difference",difference);
            await this.setState({clubs: difference });
        }
    }

    handleChangeSelected = async event => {
        if (event.target.value !== "-1"){

            let selectedObj  = {}
            selectedObj = this.props.clubs.filter(item =>{
                return item.name === event.target.value
            });
           await this.setState({ selectedClubs: [...this.state.selectedClubs, selectedObj[0]] }); 
           await this.setState({
                clubs: this.state.clubs.filter(item =>{ 
                    return  item.name !== event.target.value
                })
           });
            await this.props.addSelectedClubs(this.state.selectedClubs);
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
        await this.setState({ clubs: [...this.state.clubs, selectedObj[0]] }) 
        await this.props.addSelectedClubs(this.state.selectedClubs);
    }


    render() {

        return (
            <div>

                <div className="selected">

                    <label htmlFor="club-list" className="selected-club "  list="club-list" type='text'>
                        <select className = "select select-clab "  name="club-list" id="club-list" onChange={this.handleChangeSelected}>
                            <option key ={"-1"} >בחר מועדון מהרשימה </option>
                            {this.state.clubs &&
                                this.state.clubs.map(function(item, i){
                                    return <option key ={"option"+item.id} id = {item} value = {item.name} >{item.name}</option>
                                })
                            } 
                        </select>
                    </label>
                        <label  className="label-txt" type='text' >מועדונים שבחרתי </label>
                        <label  className="line" type='text' value={this.state.selectedClubs} ></label>
                        <ul>
                            {this.state.selectedClubs && this.state.selectedClubs.map((item ,index)  => (
                                <div className="user-selected-club" key={item.club_id}>
                                    <i onClick={this.cencelSelecterClab}  key={"i"+item.club_id} id={item.name} className=" material-icons close-small-btn">close</i>
                                    <li className = "list-courses" key={"li"+item.id}>{item.name}</li>                                    
                                </div>
                            ))}
                        </ul>
                </div>
            </div>)
    }
}
const mapStateToProps = state => ({
    clubs: state.user.clubs,
    selectedClubs: state.user.selectedClubs,
    loggedInUser: state.user.loggedInUser,

    
  });

const mapDispatchToProps = {
    getClubsList,
    addSelectedClubs,
    checkConnection,
    getUserLoggedIn,
  };
  
export default  withRouter(connect(mapStateToProps, mapDispatchToProps)(Select))