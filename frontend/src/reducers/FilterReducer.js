
let initialState = {
    filter:"",
    coupons:[],
    html:""
};

export default function FilterReducer(state = initialState, action = {}) {
    // console.log("action",action)
    switch (action.type) {
        case 'GET_BY_TITLE':
            
            return {
                ...state,
                coupons: [ ...action.coupons ]
            };

            case 'GET_HTML_COUPON':
            
                return {
                    ...state,
                    html:  {...action.coupons} 
                };

            case 'SET_FILTER':
                return {
                    ...state,
                    filter: action.filter 
                };
            default:
            // console.log("FilterReduce -> ",state)
            return state;
    }
}