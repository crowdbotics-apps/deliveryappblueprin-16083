import {all, takeLatest, put, call} from 'redux-saga/effects';
import * as NavigationService from '../../../navigator/NavigationService';

import {
  ORDERS_REQUEST,
  ORDERS_UPDATE,
  ORDERS_DELIVERED_REQUEST,
  ORDERS_DELIVERED_UPDATE,
  ORDERS_DELIVERED_ERROR
} from './constants';
import {request,setupHttpConfig} from '../../../utils/http';
import { NavigateToMenuItems } from './actions';


function getOrder({location_latitude,location_longitude,driver_id}) {
  res = request.get(`/api/v1/myOrder?driver_id=${driver_id}&location_latitude=${location_latitude}&location_longitude=${location_longitude}`);
  //There is no reset password endpoint in backend, it's just a fake url
  return res;
}

function deliveredOrderReq({data}) {
  return request.post('/api/v1/delivered-order/', {
    data
  });
}

function* deliveredOrder(action){
    console.log("deliveredOrder:: ", action);

    try {
        const {status, data} = yield call(deliveredOrderReq, {
            data:action.data
        });
        //console.log("deliveredOrderReq::",data);
        if (status === 200) {
            yield put({type: ORDERS_DELIVERED_UPDATE,responseDelivered:data,successDelivered:true});
        } else {
            yield put({type: ORDERS_DELIVERED_ERROR, error: 'Unknown Error'});
        }
    } catch (error) {
        console.log('deliveredOrderReq:',error);
        // todo add errors with similar structure in backend
        yield put({type: ORDERS_DELIVERED_ERROR, error: "Can't sign in with provided credentials"});
    }
}

function* getOrders(action) {
  setupHttpConfig();
  console.log("getOrders:: ",action)
  try {
    const {status, data} = yield call(getOrder,{location_latitude:action.location_latitude,location_longitude:action.location_longitude,driver_id:action.driver_id});
    console.log(data)
    if (status === 200) {
      yield put({
        type: ORDERS_UPDATE,
        data: data,
      });
    } 
  } catch (error) {
    console.log(error);
    // todo add errors with similar structure in backend
  }
}

export default all([
  takeLatest(ORDERS_REQUEST, getOrders),
  takeLatest(ORDERS_DELIVERED_REQUEST, deliveredOrder),
]);
