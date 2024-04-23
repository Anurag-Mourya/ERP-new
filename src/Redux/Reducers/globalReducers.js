const initialState = {
    loading: false,
    data: null,
    error: null,
};

import {
    FETCH_MASTER_DATA_REQUEST,
    FETCH_MASTER_DATA_SUCCESS,
    FETCH_MASTER_DATA_FAILURE,

    COUNTRY_DATA_REQUEST,
    COUNTRY_DATA_SUCCESS,
    COUNTRY_DATA_FAILURE,

} from "../Constants/globalConstants";

export const masterDataReducer = (state = initialState, action) => {
    switch (action?.type) {
        case FETCH_MASTER_DATA_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_MASTER_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                masterData: action.payload,
                error: null,
            };
        case FETCH_MASTER_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const countriesDataReducer = (state = initialState, action) => {
    switch (action?.type) {
        case COUNTRY_DATA_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case COUNTRY_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                countries: action.payload,
                error: null,
            };
        case COUNTRY_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const stateDataReducer = (state = initialState, action) => {
    switch (action?.type) {
        case COUNTRY_DATA_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case COUNTRY_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                state: action.payload,
                error: null,
            };
        case COUNTRY_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const citiesDataReducer = (state = initialState, action) => {
    switch (action?.type) {
        case COUNTRY_DATA_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case COUNTRY_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                city: action.payload,
                error: null,
            };
        case COUNTRY_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

