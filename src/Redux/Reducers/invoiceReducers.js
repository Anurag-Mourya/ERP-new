import {
    INVOICE_DETAIL_REQUEST,
    INVOICE_DETAIL_SUCCESS,
    INVOICE_DETAIL_ERROR,

    INVOICE_STATUS_REQUEST,
    INVOICE_STATUS_SUCCESS,
    INVOICE_STATUS_ERROR,

    INVOICE_DELETE_REQUEST,
    INVOICE_DELETE_SUCCESS,
    INVOICE_DELETE_ERROR,

    PENDING_INVOICES_REQUEST,
    PENDING_INVOICES_SUCCESS,
    PENDING_INVOICES_ERROR

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

export const invoiceStatusReducer = (state = initialState, action) => {
    switch (action.type) {
        case INVOICE_STATUS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case INVOICE_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                data: action.payload,
            };
        case INVOICE_STATUS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};


export const invoiceDeleteReducer = (state = initialState, action) => {
    switch (action.type) {
        case INVOICE_DELETE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case INVOICE_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                data: action.payload,
            };
        case INVOICE_DELETE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const invoicePendingReducer = (state = initialState, action) => {
    switch (action.type) {
        case PENDING_INVOICES_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case PENDING_INVOICES_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                data: action.payload,
            };
        case PENDING_INVOICES_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};