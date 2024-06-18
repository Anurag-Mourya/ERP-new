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

    ACCOUNT_STATUS_REQUEST,
    ACCOUNT_STATUS_SUCCESS,
    ACCOUNT_STATUS_ERROR,

    ACCOUNT_DELETE_REQUEST,
    ACCOUNT_DELETE_SUCCESS,
    ACCOUNT_DELETE_ERROR,

    ACCOUNT_DETAIL_REQUEST,
    ACCOUNT_DETAIL_SUCCESS,
    ACCOUNT_DETAIL_ERROR,

} from '../Constants/accountConstants';

import {
    JOURNAL_DETAIL_REQUEST,
    JOURNAL_DETAIL_SUCCESS,
    JOURNAL_DETAIL_ERROR,

} from "../Constants/JournalAndAccountConst";

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


export const JournalDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case JOURNAL_DETAIL_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case JOURNAL_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                data: action.payload,
            };
        case JOURNAL_DETAIL_ERROR:
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

export const accountStatusReducer = (state = initialState, action) => {
    switch (action?.type) {
        case ACCOUNT_STATUS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ACCOUNT_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case ACCOUNT_STATUS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const accountDeleteReducer = (state = initialState, action) => {
    switch (action?.type) {
        case ACCOUNT_DELETE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ACCOUNT_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case ACCOUNT_DELETE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const accountDetailsReducer = (state = initialState, action) => {
    switch (action?.type) {
        case ACCOUNT_DETAIL_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ACCOUNT_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case ACCOUNT_DETAIL_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

