import request from './axios';
const urls = {
  areaList: 'item-center/app/kfc/area/list',
  hotAreaList: 'item-center/app/kfc/hot/area/list',
  restaurantList: 'item-center/app/kfc/restaurant/list',
  location: 'item-center/app/kfc/location',
};

const postUrls = {
  // convertLink: 'itemcenter/link/convert',
}

const restUrls = {

}
const re = {}

Object.keys(urls).map(item => {
  re[item] = async params => {
    let paramsStr = '';
    let url = urls[item]; 
    // if (params) {
    //   paramsStr = Object.keys(params).map(key => {
    //     return `${key}=${params[key]}`
    //   }).join('&');
    //   url += (url.indexOf('?') === -1 ? '?' : '&') + paramsStr
    // };
    const res = await request({
      url,
      params,
    });
    console.log(item, res);
    return res;
  }
});

Object.keys(postUrls).map(item => {
  re[item] = async data => {
    let paramsStr = '';
    let url = postUrls[item];
    const res = await request({
      url,
      data,
      method: 'POST',
    });
    console.log(item, res);
    return res;
  }
})




re.getpacketDetail = async id => {
  return await request({
    url: urls.getParentPacketDetail + id,
    // url: urls.getpacketDetail + id
  });
}

re.getHelps = async id => {
  return await request({
    url: urls.getHelps + id,
    params: {
      pageNo: 1,
      pageSize: 3,
    }
  });
}

export default re;
