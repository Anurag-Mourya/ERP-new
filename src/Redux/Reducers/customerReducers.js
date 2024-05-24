import {
    CREATE_CUSTOMER_REQUEST,
    CREATE_CUSTOMER_SUCCESS,
    CREATE_CUSTOMER_ERROR,

    VIEW_CUSTOMER_REQUEST,
    VIEW_CUSTOMER_SUCCESS,
    VIEW_CUSTOMER_ERROR,

    CUSTOMER_LIST_REQUEST,
    CUSTOMER_LIST_SUCCESS,
    CUSTOMER_LIST_ERROR,

    CUSTOMER_STATUS_REQUEST,
    CUSTOMER_STATUS_SUCCESS,
    CUSTOMER_STATUS_ERROR,

    CUSTOMER_DELETE_REQUEST,
    CUSTOMER_DELETE_SUCCESS,
    CUSTOMER_DELETE_ERROR,



} from '../Constants/customerConstants'


const initialState = {
    loading: false,
    data: null,
    error: null,
};

export const createCustomerReducer = (state = initialState, action) => {
    switch (action?.type) {
        case CREATE_CUSTOMER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case CREATE_CUSTOMER_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case CREATE_CUSTOMER_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};


export const viewCustomerReducer = (state = initialState, action) => {
    switch (action?.type) {
        case VIEW_CUSTOMER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case VIEW_CUSTOMER_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case VIEW_CUSTOMER_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};


export const customerListReducer = (state = initialState, action) => {
    switch (action?.type) {
        case CUSTOMER_LIST_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case CUSTOMER_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case CUSTOMER_LIST_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};


export const customerStatusReducer = (state = initialState, action) => {
    switch (action?.type) {
        case CUSTOMER_STATUS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case CUSTOMER_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case CUSTOMER_STATUS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};


export const customerDeleteReducer = (state = initialState, action) => {
    switch (action?.type) {
        case CUSTOMER_DELETE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case CUSTOMER_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case CUSTOMER_DELETE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
