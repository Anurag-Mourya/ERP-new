import {
    VIEW_VENDOS_VIEW_REQUEST,
    VIEW_VENDOS_VIEW_SUCCESS,
    VIEW_VENDOS_VIEW_ERROR,

    CREATE_VENDOS_REQUEST,
    CREATE_VENDOS_SUCCESS,
    CREATE_VENDOR_ERROR,

    VENDOS_STATUS_REQUEST,
    VENDOS_STATUS_SUCCESS,
    VENDOR_STATUS_ERROR,

    VENDOS_DELETE_REQUEST,
    VENDOS_DELETE_SUCCESS,
    VENDOR_DELETE_ERROR,
} from '../Constants/vendorConstants';


const initialState = {
    loading: false,
    data: null,
    error: null,
};

export const vendorViewReducer = (state = initialState, action) => {
    switch (action?.type) {
        case VIEW_VENDOS_VIEW_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case VIEW_VENDOS_VIEW_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case VIEW_VENDOS_VIEW_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const vendorCreateReducer = (state = initialState, action) => {
    switch (action?.type) {
        case CREATE_VENDOS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case CREATE_VENDOS_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case CREATE_VENDOR_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const vendorStatusReducer = (state = initialState, action) => {
    switch (action?.type) {
        case VENDOS_STATUS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case VENDOS_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case VENDOR_STATUS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const vendorDeleteReducer = (state = initialState, action) => {
    switch (action?.type) {
        case VENDOS_DELETE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case VENDOS_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case VENDOR_DELETE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};