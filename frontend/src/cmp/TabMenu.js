import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';import '../style/css/TabMenu.css'
import {  getByTitle ,setFilter} from '../actions/FilterActions.js'

class TabMenu extends Component {


    orderBy = async (e) => {
        console.log("e --> ", e.target.value);
        // this.props.coupons.sort((a, b) => {
        //     return a.age - b.age;
        // });
        // let coupons = [...this.props.coupons]
        // console.log("coupons--> ",this.props.coupons);
        // coupons.sort((a,b)=>{
        //     return a.subCatId - b.subCatId;
        // });
        // console.log("sorte coupons --> ",coupons)
        
        
        await this.props.setFilter(this.props.filter);
        await this.props.getByTitle(this.props.filter,e.target.value);
        await console.log("filter",this.props.coupons.filter);
        this.props.history.push(`/coupon/results/${this.props.filter}`);
    }

    render() {
        return (
            <div className="tab">
                <button id="percent" className="tablinks" value="percent" onClick={this.orderBy}>  %  </button>
                <button id="onePlus" className="tablinks" value="onePlus" onClick={this.orderBy}> 1 + 1 </button>
                <button id="clubs"   className="tablinks" value="clubs" onClick={this.orderBy}>מועדונים</button>
                <button id="combine" className="tablinks" value="combine" onClick={this.orderBy}>משולב</button>
            </div>
        )
    }



} 
const mapStateToProps = state => ({
    coupons: state.coupons.coupons,
    filter: state.coupons.filter,
});

const mapDispatchToProps = {
    getByTitle,
    setFilter
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TabMenu))