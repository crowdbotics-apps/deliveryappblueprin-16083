import * as actions from "./constants";

const initialState = {
    orders: null,
    selectedOrder: null,
    successDelivered:null,
    responseDelivered:null
};

export default CategoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.ORDERS_UPDATE:
            return {
                ...state,
                orders: action.data
            };
            case actions.ORDERS_DELIVERED_UPDATE:
              console.log(action)
              return {
                  ...state,
                  responseDelivered: action.responseDelivered,
                  successDelivered: action.successDelivered
              };
        default:
            return state;
    }
};