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

    STATE_DATA_REQUEST,
    STATE_DATA_SUCCESS,
    STATE_DATA_FAILURE,

    CITY_DATA_REQUEST,
    CITY_DATA_SUCCESS,
    CITY_DATA_FAILURE,

    CREATE_CUSTOM_FIELD_REQUEST,
    CREATE_CUSTOM_FIELD_SUCCESS,
    CREATE_CUSTOM_FIELD_FAILURE,

    GET_CURRENCY_REQUEST,
    GET_CURRENCY_SUCCESS,
    GET_CURRENCY_ERROR,
    GET_TAX_RATE_REQUEST,
    GET_TAX_RATE_SUCCESS,
    GET_TAX_RATE_ERROR,

    UPDATE_ADDRESS_REQUEST,
    UPDATE_ADDRESS_SUCCESS,
    UPDATE_ADDRESS_ERROR,
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
        case STATE_DATA_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case STATE_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                state: action.payload,
                error: null,
            };
        case STATE_DATA_FAILURE:
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
        case CITY_DATA_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case CITY_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                city: action.payload,
                error: null,
            };
        case CITY_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};


export const createCustomReducer = (state = initialState, action) => {
    switch (action?.type) {
        case CREATE_CUSTOM_FIELD_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case CREATE_CUSTOM_FIELD_SUCCESS:
            return {
                ...state,
                loading: false,
                custom: action.payload,
                error: null,
            };
        case CREATE_CUSTOM_FIELD_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};


export const getCurrencyReducer = (state = initialState, action) => {
    switch (action?.type) {
        case GET_CURRENCY_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_CURRENCY_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case GET_CURRENCY_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};


export const getTaxRateReducer = (state = initialState, action) => {
    switch (action?.type) {
        case GET_TAX_RATE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_TAX_RATE_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case GET_TAX_RATE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const updateAddressReducer = (state = initialState, action) => {
    switch (action?.type) {
        case UPDATE_ADDRESS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case UPDATE_ADDRESS_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case UPDATE_ADDRESS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};



