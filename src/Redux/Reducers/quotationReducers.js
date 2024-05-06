import {
    QUOTATION_DETAIL_REQUEST,
    QUOTATION_DETAIL_SUCCESS,
    QUOTATION_DETAIL_ERROR,
    QUOTATION_UPDATE_REQUEST,
    QUOTATION_UPDATE_SUCCESS,
    QUOTATION_UPDATE_ERROR
} from "../Constants/quotationConstants";

const initialState = {
    loading: false,
    data: null,
    error: null
};

export const quotationDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case QUOTATION_DETAIL_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case QUOTATION_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                data: action.payload,
            };
        case QUOTATION_DETAIL_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const quotationUpdateReducer = (state = initialState, action) => {
    switch (action.type) {
        case QUOTATION_UPDATE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case QUOTATION_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                data: action.payload,
            };
        case QUOTATION_UPDATE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
