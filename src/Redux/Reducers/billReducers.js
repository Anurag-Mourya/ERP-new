import {
    BILL_LIST_REQUEST,
    BILL_LIST_SUCCESS,
    BILL_LIST_ERROR,

    BILL_DETAILS_REQUEST,
    BILL_DETAILS_SUCCESS,
    BILL_DETAILS_ERROR,

    BILL_DELETE_REQUEST,
    BILL_DELETE_SUCCESS,
    BILL_DELETE_ERROR,

} from '../Constants/billConstants';

const initialState = {
    loading: false,
    data: null,
    error: null,
};

export const billListReducer = (state = initialState, action) => {
    switch (action?.type) {
        case BILL_LIST_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case BILL_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case BILL_LIST_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const billDetailReducer = (state = initialState, action) => {
    switch (action?.type) {
        case BILL_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case BILL_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case BILL_DETAILS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const billDeleteReducer = (state = initialState, action) => {
    switch (action?.type) {
        case BILL_DELETE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case BILL_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case BILL_DELETE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
