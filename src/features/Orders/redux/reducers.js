import * as actions from "./constants";

const initialState = {
    orders: null,
    selectedOrder: null,
};

export default CategoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.ORDERS_UPDATE:
            return {
                ...state,
                orders: action.data
            };
        default:
            return state;
    }
};