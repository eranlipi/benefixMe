import React, { Component } from 'react';
import '../style/css/ContactAs.css'
import phone from "../style/img/contact-us-icon.png"
import WhatsApp from "../style/img/whatsapp-icon.png"
import email from "../style/img/mail-icon.png"
export default class ContactAs extends Component {
    
    sendEmail= () =>{
        window.location = "mailto:support@benefix-me.com";
    }
    onCall=()=>{
        window.location="tel:// 036343517";
    }
    onWhatapp =()=>{
        
        window.location="//api.whatsapp.com/send?phone=+972548082132&text=BENEFIX-ME";
    }
    render(){

        return(
            <div className ="contact-as-con">
                <p>?היי, איך נוח לך ליצור איתנו קשר</p>
                <div className="contact-as" onClick={this.onWhatapp}>
                    <div className="section">
                        <img className="contact-as-img" src={phone}></img>
                        <p>טלפון</p>
                    </div>
                    <div className="section" onclick={this.onCall}>
                            <img className="contact-as-img" src={WhatsApp}></img>
                            <p>WhtsApp</p>
                    </div>
                    <div className="section" onClick={this.sendEmail}>
                        <img className="contact-as-img" src={email}></img>
                        <p> מייל</p>
                    </div>
                </div>
                <p>שירות הלקוחות</p>
                <p>זמין לרשותך בימים א'-ה' בשעות 9:00-16:00</p>
            </div>
        )
    }
}