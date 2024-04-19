import {
    SALE_DETAIL_REQUEST,
    SALE_DETAIL_SUCCESS,
    SALE_DETAIL_ERROR,

} from "../Constants/saleOrderConstants";

const initialState = {
    loading: false,
    data: null,
    error: null
}

export const saleOrderDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case SALE_DETAIL_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case SALE_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                data: action.payload,
            }

        case SALE_DETAIL_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }

        default:
            return state;
    }
}