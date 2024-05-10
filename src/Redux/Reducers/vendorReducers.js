import {
    VIEW_VENDOS_VIEW_REQUEST,
    VIEW_VENDOS_VIEW_SUCCESS,
    VIEW_VENDOS_VIEW_ERROR,

    CREATE_VENDOS_REQUEST,
    CREATE_VENDOS_SUCCESS,
    CREATE_VENDOR_ERROR,
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