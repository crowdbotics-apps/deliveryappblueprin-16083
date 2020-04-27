import * as actions from "./constants";

export const loadOrder = (location_latitude,location_longitude,driver_id) => ({
  type: actions.ORDERS_REQUEST,
  location_latitude,location_longitude,driver_id
});

