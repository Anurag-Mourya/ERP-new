import {
    PURCHASES_CREATE_REQUEST,
    PURCHASES_CREATE_SUCCESS,
    PURCHASES_CREATE_ERROR,

    PURCHASES_DETAIL_REQUEST,
    PURCHASES_DETAIL_SUCCESS,
    PURCHASES_DETAIL_ERROR,

    PURCHASES_DELETE_REQUEST,
    PURCHASES_DELETE_SUCCESS,
    PURCHASES_DELETE_ERROR,
} from '../Constants/purchasesConstants.js';

const initialState = {
    loading: false,
    data: null,
    error: null,
};

export const createPurchasesReducer = (state = initialState, action) => {
    switch (action?.type) {
        case PURCHASES_CREATE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case PURCHASES_CREATE_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case PURCHASES_CREATE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const purchasesDetailsReducer = (state = initialState, action) => {
    switch (action?.type) {
        case PURCHASES_DETAIL_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case PURCHASES_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case PURCHASES_DETAIL_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const purchasesDeleteReducer = (state = initialState, action) => {
    switch (action?.type) {
        case PURCHASES_DELETE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case PURCHASES_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case PURCHASES_DELETE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};