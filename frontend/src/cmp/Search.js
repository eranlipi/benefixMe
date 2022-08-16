import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import '../style/css/search.css'
import {  getByTitle ,setFilter} from '../actions/FilterActions.js'

export class Search extends Component {

    state = {
        val: '',
    };

    async componentDidMount() {
        await this.setState({val:this.props.filter})
      }

    handleChange = async event => {
        if (event.key !== 'Enter') {
            this.setState({ val: event.target.value });
        }
    };

    onSearchAction = async event => {

        if (event.key === 'Enter' || event.type === 'click') {
            var res = this.state.val;
            // console.log("res234  -> ",res);            

            // await this.setState({ val: '' });
            
            await this.props.getByTitle(res);
            await this.props.setFilter(res);
            // await console.log("filter",this.props.coupons.filter) 
            this.props.history.push(`/coupon/results/${res}`);
        }
    };

    onClean = async event =>{
        event.preventDefault()
        await this.setState({ val: '' });
    }

    render() {
        let text = this.props.filter !== "" ? this.props.filter : this.state.val 
        return (
            <div className="search">
                    <div  className='search-container'>
                        <input dir="rtl" id="product" className='text-search' type='text' placeholder={"איזו הטבה אתה מחפש?"}
                             value={this.state.val } onChange={this.handleChange} 
                             onKeyUp={this.onSearchAction}>
                        </input>
                        <button className="action-search material-icons" onClick={this.onSearchAction}>search</button>
                    </div>


            </div >
        )
    }

}

const mapStateToProps = state => ({
    coupons: state.coupons,
    filter: state.coupons.filter,

  });

const mapDispatchToProps = {
    getByTitle,
    setFilter
  };

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (Search))