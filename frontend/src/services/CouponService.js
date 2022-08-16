import HttpService from './HttpService';

export default {
    getByTitle
};

const endpoint = '/coupons';

async function getByTitle(title,orderBy = null) {
    // console.log("title CS", title)
    let coupons =null;
    if(orderBy!==null ){
        let data = {
            "orderBy":orderBy
        }
        data = JSON.stringify(data)
        // console.log("orderBy getByTitle",orderBy )
        coupons = await HttpService.post(`${endpoint}/orderBy/${title}`,data);
        return coupons;
    }else{
        coupons = await HttpService.get(`${endpoint}/${title}`);
        return coupons;
    }
}
