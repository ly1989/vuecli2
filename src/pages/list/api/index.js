import axios from "../../../apis/axios.js";
import qs from 'qs';

export default {
    //获取验证码
    getMenuList: (params) => {
        return axios.get("/item-center/app/kfc/menu/list?"+qs.stringify(params));
    },
    getBuyerInfo: (params) => { 
        return axios.get("/trade/zmjxBizOrder/kfc/getBuyerInfo?"+qs.stringify(params));
    }
}