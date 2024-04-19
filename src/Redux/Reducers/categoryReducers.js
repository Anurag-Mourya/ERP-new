import {
    CREATE_CATEGORY_REQUEST,
    CREATE_CATEGORY_SUCCESS,
    CREATE_CATEGORY_ERROR,
    CREATE_SUB_CATEGORY_REQUEST,
    CREATE_SUB_CATEGORY_SUCCESS,
    CREATE_SUB_CATEGORY_ERROR,
} from '../Constants/categoriesConstants'


const initialState = {
    loading: false,
    data: null,
    error: null,
};

export const createCategoryReducer = (state = initialState, action) => {
    switch (action?.type) {
        case CREATE_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case CREATE_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case CREATE_CATEGORY_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};


export const createSubCategoryReducer = (state = initialState, action) => {
    switch (action?.type) {
        case CREATE_SUB_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case CREATE_SUB_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case CREATE_SUB_CATEGORY_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

