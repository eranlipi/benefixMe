import React, { Component  } from 'react'
import {Link} from "react-router-dom";
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { checkConnection ,logout,addSelectedClubs} from '../actions/UserAction'
import '../style/css/footer.css'

export class Footer extends Component {

    onLogOut = async event =>{
        // event.preventDefault()
        // await this.setState({ val: '' });
        // console.log("LOG")
        await this.props.logout()
        let emptyArray = [-1]
        await this.props.addSelectedClubs(emptyArray)
        await this.props.history.push(`/`);

    }
     
    render() {
        let isLogIn = checkConnection()
        return (<div className="footer-cont">

            {!isLogIn && <div className="footer">
                <div className="register-btn" ><Link to="/WebViewfrom/registration">להרשמה מהירה</Link></div>
                <div className="vl"></div>
                <div className="about-us-btn"><Link to="/AboutAs">?רוצה לדעת יותר </Link></div>
            </div>}
            {isLogIn && <div className="footer">
                <div className="log-out-btn" onClick={this.onLogOut}  >התנתק</div>
     
            </div>}
        </div>)
    }
}
  const mapStateToProps = state => ({
     loggedInUser: state.user.loggedInUser,
     clubs: state.user.clubs,
     selectedClubs: state.user.selectedClubs,
  });

  const mapDispatchToProps = {
    checkConnection,
    logout,
    addSelectedClubs
  };

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (Footer))


