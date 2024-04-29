import {
    CREATE_CATEGORY_REQUEST,
    CREATE_CATEGORY_SUCCESS,
    CREATE_CATEGORY_ERROR,

    CREATE_SUB_CATEGORY_REQUEST,
    CREATE_SUB_CATEGORY_SUCCESS,
    CREATE_SUB_CATEGORY_ERROR,

    SUB_CATEGORY_LIST_REQUEST,
    SUB_CATEGORY_LIST_SUCCESS,
    SUB_CATEGORY_LIST_ERROR,

    DELETE_CATEGORY_REQUEST,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_ERROR,


    STATUS_CATEGORY_REQUEST,
    STATUS_CATEGORY_SUCCESS,
    STATUS_CATEGORY_ERROR,

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


export const subCategoryListReducer = (state = initialState, action) => {
    switch (action?.type) {
        case SUB_CATEGORY_LIST_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case SUB_CATEGORY_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case SUB_CATEGORY_LIST_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};


export const deleteCategoryReducer = (state = initialState, action) => {
    switch (action?.type) {
        case DELETE_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case DELETE_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case DELETE_CATEGORY_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};


export const categoryStatusReducer = (state = initialState, action) => {
    switch (action?.type) {
        case STATUS_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case STATUS_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case STATUS_CATEGORY_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

