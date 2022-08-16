import React, { Component } from 'react';
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import selectImg from "../style/img/selectIcon.png"
import  '../style/css/CardPreview.css'

class CardPreview extends Component {


    isMyClub =(clubName)=> {
        let {selectedClubs} =this.props 
        let matched = selectedClubs.filter( x =>{
            console.log(x.name)
            return clubName === x.name
        });
        return matched
    }

    // fixUrl =(urlCoupon,siteName)=>{
    //     let newUrl = ""
    //     switch(siteName){
    //         case "paisplus":
    //             newUrl = "https://www.paisplus.co.il"+urlCoupon
    //             break;
    //     }
    //     // console.log("newUrl ",newUrl);
    //     return newUrl 
    // }

    render() {

        var {coupon}=this.props 
        // console.log("isMyClub->> ",this.isMyClub())
        // if (coupon.urlCoupon.includes("http") === false ){
        //     coupon.urlCoupon = this.fixUrl(coupon.urlCoupon,coupon.siteName)
        // }

        return (coupon && 
            <div className="coupon">
                <div className="first-row">
                    <div className="titles">
                        <div className="title-coupon">{coupon.title}</div>
                        <div className="price-coupon">{coupon.price}</div>
                        <div className="subTitle-coupon">{coupon.subTitle}</div>
                        <div className="club-coupon">{coupon.siteName}<span> :מועדון </span></div>
                        
                    </div>

                    <div className="img-coupon">
                        <img src={coupon.imageUrl} alt="img"></img>
                    </div>
                </div>
                <div className="bottom-coupon">
                      {/* <a target="_blank" href={`https://www.paisplus.co.il`+coupon.urlCoupon} className="action-button" rel="noreferrer" >בחרתי</a> */}
                      <a target="_blank" href={coupon.urlCoupon} className="action-button" rel="noreferrer" ><img target="_blank" className="action-button" 
                      rel="noreferrer" src={selectImg}></img></a>
                      {/* <img target="_blank" className="action-button" onclick = {this.onclickCoupon} rel="noreferrer" src={selectImg}></img> */}
                    <div className="line"></div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    selectedClubs: state.user.selectedClubs,
});

export default withRouter(connect(mapStateToProps, null)(CardPreview))