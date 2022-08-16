import React, { Component } from 'react'
import { withRouter } from "react-router";

import CardPreview from './CardPreview'
import  '../style/css/cardList.css'


class CardList extends Component{

    render(){
        // console.log("CardList -> ",this.props.coupons)
        
        return(
            <section >
                <div className="card-list">
                {this.props.coupons.length > 0 && this.props.coupons.map((coupon)  => {
                    
                     return <CardPreview  key ={coupon.couponId} coupon={coupon}></CardPreview>
                    
            })}
            </div>
            </section>
        )
    }
}
export default withRouter(CardList);