import axios from "../../../apis/axios.js";
import qs from 'qs';

export default {
    //获取列表请求方法
    getDetailAjax: (params) => {
        return axios.get("/trade/zmjxCard/orderList/orderDetail?"+qs.stringify(params));
    },
}