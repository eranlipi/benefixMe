getHtmlCoupon


import MyIframeService from '../services/MyIframeService';

export default {
    getHtmlCoupon
};

export function getHtmlCoupon(url) {
    // console.log("getByTitle FA ->",title)
    return async dispatch => {
      const html = await MyIframeService.getHtmlCoupon(url);
      dispatch({ type: 'GET_BY_TITLE', html });
    };
  }