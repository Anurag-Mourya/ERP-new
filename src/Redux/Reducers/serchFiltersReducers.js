


export const creditNoteListReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CREDIT_LIST_DATA_REQUEST: return { ...state, loading: true, error: null };
        case FETCH_CREDIT_LIST_DATA_SUCCESS: return { ...state, loading: false, data: action.payload, error: null };
        case FETCH_CREDIT_LIST_DATA_FAILURE: return { ...state, loading: false, data: null, error: action.payload };
        default: return state;
    }
};