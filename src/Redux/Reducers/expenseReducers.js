import {
    EXPENSE_LIST_REQUEST,
    EXPENSE_LIST_SUCCESS,
    EXPENSE_LIST_ERROR,

    // EXPENSE_DETAILS_REQUEST,
    // EXPENSE_DETAILS_SUCCESS,
    // EXPENSE_DETAILS_ERROR,

    EXPENSE_CREATE_REQUEST,
    EXPENSE_CREATE_SUCCESS,
    EXPENSE_CREATE_ERROR,

    EXPENSE_DELETE_REQUEST,
    EXPENSE_DELETE_SUCCESS,
    EXPENSE_DELETE_ERROR,
} from '../Constants/expenseConstants.js';

const initialState = {
    loading: false,
    data: null,
    error: null,
};

export const expenseListReducer = (state = initialState, action) => {
    switch (action?.type) {
        case EXPENSE_LIST_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case EXPENSE_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case EXPENSE_LIST_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const expenseDeleteReducer = (state = initialState, action) => {
    switch (action?.type) {
        case EXPENSE_DELETE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case EXPENSE_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case EXPENSE_DELETE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const expenseCreateReducer = (state = initialState, action) => {
    switch (action?.type) {
        case EXPENSE_CREATE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case EXPENSE_CREATE_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case EXPENSE_CREATE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
