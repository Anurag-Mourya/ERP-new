import {
    CREDIT_NOTE_DETAIL_REQUEST,
    CREDIT_NOTE_DETAIL_SUCCESS,
    CREDIT_NOTE_DETAIL_ERROR,

    CREDIT_NOTE_DELETE_REQUEST,
    CREDIT_NOTE_DELETE_SUCCESS,
    CREDIT_NOTE_DELETE_ERROR,

    DEBIT_NOTE_DELETE_REQUEST,
    DEBIT_NOTE_DELETE_SUCCESS,
    DEBIT_NOTE_DELETE_ERROR,

    DEBIT_DETAILS_REQUEST,
    DEBIT_DETAILS_SUCCESS,
    DEBIT_DETAILS_ERROR,
} from "../Constants/noteConstants";

const initialState = {
    loading: false
}

export const debitNoteDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case DEBIT_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case DEBIT_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                data: action.payload,
            }

        case DEBIT_DETAILS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }

        default:
            return state;
    }
}

export const creditNoteDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREDIT_NOTE_DETAIL_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case CREDIT_NOTE_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                creditDetail: action.payload,
            }

        case CREDIT_NOTE_DETAIL_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }

        default:
            return state;
    }
}

export const debitNoteDeleteReducer = (state = initialState, action) => {
    switch (action.type) {
        case DEBIT_NOTE_DELETE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case DEBIT_NOTE_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                data: action.payload,
            }

        case DEBIT_NOTE_DELETE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }

        default:
            return state;
    }
}

export const creditNoteDeleteReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREDIT_NOTE_DELETE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case CREDIT_NOTE_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                creditDetail: action.payload,
            }

        case CREDIT_NOTE_DELETE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }

        default:
            return state;
    }
}