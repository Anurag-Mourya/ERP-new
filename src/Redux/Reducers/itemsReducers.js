import {
    ADD_ITMES_REQUEST,
    ADD_ITMES_SUCCESS,
    ADD_ITMES_ERROR,

    STOCK_ITMES_REQUEST,
    STOCK_ITMES_SUCCESS,
    STOCK_ITMES_ERROR,

    ITMES_DETAIL_REQUEST,
    ITMES_DETAIL_SUCCESS,
    ITMES_DETAIL_ERROR,
} from "../Constants/itemsConstants";

const initialState = {
    loading: false
}

export const addItemsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ITMES_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case ADD_ITMES_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                addItemsResponse: action.payload,
            }

        case ADD_ITMES_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }

        default:
            return state;
    }
}

export const stockItemsReducer = (state = initialState, action) => {
    switch (action.type) {
        case STOCK_ITMES_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case STOCK_ITMES_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                stockData: action.payload,
            }

        case STOCK_ITMES_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }

        default:
            return state;
    }
}

export const itemsDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case ITMES_DETAIL_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case ITMES_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                itemsDetail: action.payload,
            }

        case ITMES_DETAIL_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }

        default:
            return state;
    }
}
