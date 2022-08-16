import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getByTitle, setFilter } from '../actions/FilterActions';

import CardList from '../cmp/CardList'
import Search from '../cmp/Search'
import TabMenu from '../cmp/TabMenu'
// import {  getByTitle } from '../actions/FilterActions.js'
import '../style/css/couponApp.css'
import '../style/css/cardList.css'


export class CouponApp extends Component {

  state={
    searchWord:""
  }
  async componentDidMount() {
    console.log("componentDidMount->>>>")
    window.scrollTo(0, 10)
    if (this.props.location.pathname.includes('results')) {
      console.log("componentDidMount->>>> AFTER IF ")
      const results = this.props.location.pathname;
      const word = results.split("/")

      console.log("results", word[3])
      this.setState({searchWord:word[3]})
      await this.props.getByTitle(word[3]);
    }
  }

  async componentWillUnmount() {
    await this.resetFilterDefinitions();
  }
  resetFilterDefinitions = async () => {
    await this.props.setFilter("");
  }
  render() {
    // console.log("state",this.state.searchWord)
    let word =  this.state.searchWord !== "" ? "" :this.state.searchWord 
    const isUrl = this.props.location.pathname.includes('results')
    return (
      <div className = "coupon-page">
        <Search  textSearch={word}/>
        <TabMenu></TabMenu>
        {/* <div className="line-bar"></div> */}
        <div className = "coupons">
          {isUrl && <CardList coupons={this.props.coupons.coupons}></CardList>}
        
        </div>

      </div>)
  }

}

const mapStateToProps = state => ({
  coupons: state.coupons,
  filter: state.coupons.filter,
  
});

const mapDispatchToProps = {
  getByTitle,
  setFilter,

};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CouponApp))