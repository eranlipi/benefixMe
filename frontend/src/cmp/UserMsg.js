// import React from 'react'
import "../style/css/msgUsr.css"
function getText(){
    // var hour = new Date().getetMinutes();
    let time = new Date().getHours();
    let  Morning = "בוקר טוב"
    let  Afternoon = "אחר צהריים"
    let  Evening = "ערב טוב"
    let txt  = (time<12 ? Morning : time<18 ? Afternoon : Evening) 
    return txt;
}
function UserMsg(props){
    let msg = props.msg ;
    let timeTxt = getText();
    return (
        <div className="cont-msg">
            <p>{timeTxt}</p>
            <p>{msg}</p>
        </div>
    )
}

export default UserMsg;
