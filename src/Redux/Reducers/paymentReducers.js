import {
    PAYMENT_CREATE_REQUEST,
    PAYMENT_CREATE_SUCCESS,
    PAYMENT_CREATE_ERROR,

    PAYMENT_DETAIL_REQUEST,
    PAYMENT_DETAIL_SUCCESS,
    PAYMENT_DETAIL_ERROR,

    PAYMENT_STATUS_REQUEST,
    PAYMENT_STATUS_SUCCESS,
    PAYMENT_STATUS_ERROR,

    PAYMENT_DELETE_REQUEST,
    PAYMENT_DELETE_SUCCESS,
    PAYMENT_DELETE_ERROR,


    FETCH_PAYMENT_REC_LIST_DATA_REQUEST,
    FETCH_PAYMENT_REC_LIST_DATA_SUCCESS,
    FETCH_PAYMENT_REC_LIST_DATA_FAILURE,
} from '../Constants/paymentConstatnt';

const initialState = {
    loading: false
}

export const paymentListReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PAYMENT_REC_LIST_DATA_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case FETCH_PAYMENT_REC_LIST_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                data: action.payload,
            }

        case FETCH_PAYMENT_REC_LIST_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }

        default:
            return state;
    }
}

export const createPaymentReducer = (state = initialState, action) => {
    switch (action.type) {
        case PAYMENT_CREATE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case PAYMENT_CREATE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                data: action.payload,
            }

        case PAYMENT_CREATE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }

        default:
            return state;
    }
}

export const paymentDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case PAYMENT_DETAIL_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case PAYMENT_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                data: action.payload,
            }

        case PAYMENT_DETAIL_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }

        default:
            return state;
    }
}

export const paymentDeleteReducer = (state = initialState, action) => {
    switch (action.type) {
        case PAYMENT_DELETE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case PAYMENT_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                data: action.payload,
            }

        case PAYMENT_DELETE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }

        default:
            return state;
    }
}

export const paymentStatusReducer = (state = initialState, action) => {
    switch (action.type) {
        case PAYMENT_STATUS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case PAYMENT_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                data: action.payload,
            }

        case PAYMENT_STATUS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }

        default:
            return state;
    }
}
