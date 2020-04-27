import {all, takeLatest, put, call} from 'redux-saga/effects';
import * as NavigationService from '../../../navigator/NavigationService';

import {
  ORDERS_REQUEST,
  ORDERS_UPDATE
} from './constants';
import {request,setupHttpConfig} from '../../../utils/http';
import { NavigateToMenuItems } from './actions';


function getOrder({location_latitude,location_longitude,driver_id}) {
  res = request.get(`/api/v1/myOrder?driver_id=${driver_id}&location_latitude=${location_latitude}&location_longitude=${location_longitude}`);
  //There is no reset password endpoint in backend, it's just a fake url
  return res;
}

function* getOrders(action) {
  setupHttpConfig();
  console.log("getCategoryItem:: ",action)
  try {
    const {status, data} = yield call(getOrder,{location_latitude:action.location_latitude,location_longitude:action.location_longitude,driver_id:action.driver_id});
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
]);
