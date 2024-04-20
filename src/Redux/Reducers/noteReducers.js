import {
    CREDIT_NOTE_DETAIL_REQUEST,
    CREDIT_NOTE_DETAIL_SUCCESS,
    CREDIT_NOTE_DETAIL_ERROR,
} from "../Constants/noteConstants";

const initialState = {
    loading: false
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