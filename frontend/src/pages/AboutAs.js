import React, { Component } from 'react';
import '../style/css/AboutAs.css'
import findMeMore from "../style/img/find-to-me-icon.png"
import aboutAs from "../style/img/know-more-icon.png"
import simpleReg from "../style/img/enrollment-icon.png"
export default class AboutAs extends Component {


    render(){

        return (<div className = "about-as-container">
            <div className = "section" >
                <img className="about-as-img" src={findMeMore}></img>
                <p> מוצאים עבורך את ההטבה הטובה ביותר   </p>
                <p>מבין המועדונים וכרטיסי האשראי שלך</p>
            </div>
            <div className="section">
                <img className="about-as-img" src={aboutAs}></img>
                <p> ? רוצה לדעת עלינו יותר  </p>
            </div>
            <div className="section">
                <img className="about-as-img" src={simpleReg}></img>
                <p> ההרשמה פשוטה ומהירה  תאפשר לך   </p>
                <p>לבצע חיפושים באופן קל ומהיר הרבה יותר</p>
            </div>
        </div>)
    }
}