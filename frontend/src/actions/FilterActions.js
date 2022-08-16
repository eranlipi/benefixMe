
// import CouponService from '../services/CouponService';
import CouponService from '../services/CouponService';



export function setFilter(filter,orderBy=null) {
    return async dispatch => await dispatch(_setFilter(filter,orderBy))
}

function _setFilter(filter,orderBy) {
    return {
        type: 'SET_FILTER',
        filter,
        orderBy
    }
}

export function getByTitle(title,orderBy=null) {
    // console.log("getByTitle orderBy ->",orderBy)
    return async dispatch => {
      const coupons = await CouponService.getByTitle(title,orderBy);
      dispatch({ type: 'GET_BY_TITLE', coupons });
    };
  }

  // export function getByTitle(title ,orderBy) {
  //   // console.log("getByTitle FA ->",title)
  //   return async dispatch => {
  //     const coupons = await CouponService.getByTitle(title,orderBy);
  //     dispatch({ type: 'GET_BY_TITLE_ORDER_BY', coupons });
  //   };
  // }
  export default {
    setFilter,
    getByTitle
};