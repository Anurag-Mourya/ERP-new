import {
    INVOICE_DETAIL_REQUEST,
    INVOICE_DETAIL_SUCCESS,
    INVOICE_DETAIL_ERROR,

} from "../Constants/invoiceConstants";

const initialState = {
    loading: false,
    data: null,
    error: null
}

export const invoiceDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case INVOICE_DETAIL_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case INVOICE_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                data: action.payload,
            }

        case INVOICE_DETAIL_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }

        default:
            return state;
    }
}