import {
    FETCH_ITEM_LIST_DATA_REQUEST,
    FETCH_ITEM_LIST_DATA_SUCCESS,
    FETCH_ITEM_LIST_DATA_FAILURE,

    FETCH_CAT_LIST_DATA_REQUEST,
    FETCH_CAT_LIST_DATA_SUCCESS,
    FETCH_CAT_LIST_DATA_FAILURE,

    FETCH_ACC_LIST_DATA_REQUEST,
    FETCH_ACC_LIST_DATA_SUCCESS,
    FETCH_ACC_LIST_DATA_FAILURE,

    FETCH_QUOTE_LIST_DATA_REQUEST,
    FETCH_QUOTE_LIST_DATA_SUCCESS,
    FETCH_QUOTE_LIST_DATA_FAILURE,

    FETCH_SALE_LIST_DATA_REQUEST,
    FETCH_SALE_LIST_DATA_SUCCESS,
    FETCH_SALE_LIST_DATA_FAILURE,

    FETCH_INVOICE_LIST_DATA_REQUEST,
    FETCH_INVOICE_LIST_DATA_SUCCESS,
    FETCH_INVOICE_LIST_DATA_FAILURE,

    FETCH_CREDIT_LIST_DATA_REQUEST,
    FETCH_CREDIT_LIST_DATA_SUCCESS,
    FETCH_CREDIT_LIST_DATA_FAILURE,

    FETCH_VENDOR_LIST_DATA_REQUEST,
    FETCH_VENDOR_LIST_DATA_SUCCESS,
    FETCH_VENDOR_LIST_DATA_FAILURE,
} from "../Constants/listApiConstants";

const initialState = { loading: false, data: null, error: null };

export const categoryListReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CAT_LIST_DATA_REQUEST: return { ...state, loading: true, error: null };
        case FETCH_CAT_LIST_DATA_SUCCESS: return { ...state, loading: false, data: action.payload, error: null };
        case FETCH_CAT_LIST_DATA_FAILURE: return { ...state, loading: false, data: null, error: action.payload };
        default: return state;
    }
};
export const itemListReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ITEM_LIST_DATA_REQUEST: return { ...state, loading: true, error: null };
        case FETCH_ITEM_LIST_DATA_SUCCESS: return { ...state, loading: false, data: action.payload, error: null };
        case FETCH_ITEM_LIST_DATA_FAILURE: return { ...state, loading: false, data: null, error: action.payload };
        default: return state;
    }
};

export const accountListReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ACC_LIST_DATA_REQUEST: return { ...state, loading: true, error: null };
        case FETCH_ACC_LIST_DATA_SUCCESS: return { ...state, loading: false, data: action.payload, error: null };
        case FETCH_ACC_LIST_DATA_FAILURE: return { ...state, loading: false, data: null, error: action.payload };
        default: return state;
    }
};


export const quoatationListReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_QUOTE_LIST_DATA_REQUEST: return { ...state, loading: true, error: null };
        case FETCH_QUOTE_LIST_DATA_SUCCESS: return { ...state, loading: false, data: action.payload, error: null };
        case FETCH_QUOTE_LIST_DATA_FAILURE: return { ...state, loading: false, data: null, error: action.payload };
        default: return state;
    }
};


export const saleOrderListReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SALE_LIST_DATA_REQUEST: return { ...state, loading: true, error: null };
        case FETCH_SALE_LIST_DATA_SUCCESS: return { ...state, loading: false, data: action.payload, error: null };
        case FETCH_SALE_LIST_DATA_FAILURE: return { ...state, loading: false, data: null, error: action.payload };
        default: return state;
    }
};

export const invoiceListReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_INVOICE_LIST_DATA_REQUEST: return { ...state, loading: true, error: null };
        case FETCH_INVOICE_LIST_DATA_SUCCESS: return { ...state, loading: false, data: action.payload, error: null };
        case FETCH_INVOICE_LIST_DATA_FAILURE: return { ...state, loading: false, data: null, error: action.payload };
        default: return state;
    }
};


export const creditNoteListReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CREDIT_LIST_DATA_REQUEST: return { ...state, loading: true, error: null };
        case FETCH_CREDIT_LIST_DATA_SUCCESS: return { ...state, loading: false, data: action.payload, error: null };
        case FETCH_CREDIT_LIST_DATA_FAILURE: return { ...state, loading: false, data: null, error: action.payload };
        default: return state;
    }
};

export const vendorListReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_VENDOR_LIST_DATA_REQUEST: return { ...state, loading: true, error: null };
        case FETCH_VENDOR_LIST_DATA_SUCCESS: return { ...state, loading: false, data: action.payload, error: null };
        case FETCH_VENDOR_LIST_DATA_FAILURE: return { ...state, loading: false, data: null, error: action.payload };
        default: return state;
    }
};



