import {
    PURCHASES_CREATE_REQUEST,
    PURCHASES_CREATE_SUCCESS,
    PURCHASES_CREATE_ERROR,
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