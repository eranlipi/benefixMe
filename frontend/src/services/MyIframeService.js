

import HttpService from './HttpService';

export default {
	getHtmlCoupon
};

const endpoint = '/getCouponSearch.api.php';

async function getHtmlCoupon(url) {
    console.log("getHtmlCoupon MY Iframe Service " ,title)
    const html = await HttpService.get(url);
    console.log("HTML" , html)
    return html;
  }