import {
    SALE_DETAIL_REQUEST,
    SALE_DETAIL_SUCCESS,
    SALE_DETAIL_ERROR,

    SALEORDER_STATUS_REQUEST,
    SALEORDER_STATUS_SUCCESS,
    SALEORDER_STATUS_ERROR,

    SALEORDER_DELETE_REQUEST,
    SALEORDER_DELETE_SUCCESS,
    SALEORDER_DELETE_ERROR,

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

export const saleOrderStatusReducer = (state = initialState, action) => {
    switch (action.type) {
        case SALEORDER_STATUS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case SALEORDER_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                data: action.payload,
            };
        case SALEORDER_STATUS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
export const saleOrderDeleteReducer = (state = initialState, action) => {
    switch (action.type) {
        case SALEORDER_DELETE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case SALEORDER_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                data: action.payload,
            };
        case SALEORDER_DELETE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};