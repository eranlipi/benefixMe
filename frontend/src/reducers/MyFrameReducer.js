
let initialState = {

    html: ""
};

export default function getHtmlCoupon(state = initialState, action = {}) {
    // console.log("action",action)
    switch (action.type) {


        case 'GET_HTML_COUPON':

            return {
                ...state,
                html: { ...action.coupons }
            };

        default:
            // console.log("FilterReduce -> ",state)
            return state;
    }
}