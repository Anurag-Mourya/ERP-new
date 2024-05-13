import {
    CREATE_JOURNAL_REQUEST,
    CREATE_JOURNAL_SUCCESS,
    CREATE_JOURNAL_ERROR,

    GET_ACCOUNT_TYPE_REQUEST,
    GET_ACCOUNT_TYPE_SUCCESS,
    GET_ACCOUNT_TYPE_ERROR,

    CREATE_ACCOUNT_TYPE_REQUEST,
    CREATE_ACCOUNT_TYPE_SUCCESS,
    CREATE_ACCOUNT_TYPE_ERROR,

} from '../Constants/accountConstants';

const initialState = {
    loading: false,
    data: null,
    error: null,
};

export const journalsReducer = (state = initialState, action) => {
    switch (action?.type) {
        case CREATE_JOURNAL_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case CREATE_JOURNAL_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case CREATE_JOURNAL_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};


export const accountTypeReducer = (state = initialState, action) => {
    switch (action?.type) {
        case GET_ACCOUNT_TYPE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_ACCOUNT_TYPE_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case GET_ACCOUNT_TYPE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};


export const createAccountReducer = (state = initialState, action) => {
    switch (action?.type) {
        case CREATE_ACCOUNT_TYPE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case CREATE_ACCOUNT_TYPE_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case CREATE_ACCOUNT_TYPE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

