import toast from "react-hot-toast";
import axiosInstance from "../../Configs/axiosInstance";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
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

    FETCH_EXPENSE_HEAD_LIST_REQUEST,
    FETCH_EXPENSE_HEAD_LIST_SUCCESS,
    FETCH_EXPENSE_HEAD_LIST_FAILURE,

} from "../Constants/globalConstants";

export const expenseHeadLists = () => {
    return async (dispatch) => {
        dispatch({ type: FETCH_EXPENSE_HEAD_LIST_REQUEST });
        try {
            const response = await axiosInstance.post(`${apiUrl}/expensehead/list`);
            dispatch({ type: FETCH_EXPENSE_HEAD_LIST_SUCCESS, payload: response.data });
        } catch (error) {
            dispatch({ type: FETCH_EXPENSE_HEAD_LIST_FAILURE, payload: error.message });
        }
    };
};

export const fetchMasterData = () => {
    return async (dispatch) => {
        dispatch({ type: FETCH_MASTER_DATA_REQUEST });
        try {
            const response = await axiosInstance.post(`${apiUrl}/master/fetch/required`);
            dispatch({ type: FETCH_MASTER_DATA_SUCCESS, payload: response.data });
        } catch (error) {
            dispatch({ type: FETCH_MASTER_DATA_FAILURE, payload: error.message });
        }
    };
};

export const fetchGetCountries = () => {
    return async (dispatch) => {
        dispatch({ type: COUNTRY_DATA_REQUEST });
        try {
            const response = await axiosInstance.post(`${apiUrl}/get/country`);
            dispatch({ type: COUNTRY_DATA_SUCCESS, payload: response.data });
        } catch (error) {
            dispatch({ type: COUNTRY_DATA_FAILURE, payload: error.message });
        }
    };
};

export const fetchGetStates = (data) => async dispatch => {
    dispatch({ type: STATE_DATA_REQUEST });
    try {
        const response = await axiosInstance.post(`/get/state`, data);
        dispatch({ type: STATE_DATA_SUCCESS, payload: response?.data });
        // console.log("state data from Action", response?.data);
    } catch (error) {
        dispatch({ type: STATE_DATA_FAILURE, payload: error.message });
    }
};

export const fetchGetCities = (data) => async dispatch => {
    dispatch({ type: CITY_DATA_REQUEST });
    try {
        const response = await axiosInstance.post(`get/city`, data);
        dispatch({ type: CITY_DATA_SUCCESS, payload: response?.data });
        // console.log("city data from Action", response?.data);
    } catch (error) {
        dispatch({ type: CITY_DATA_FAILURE, payload: error.message });
    }
};


export const creatCustomFields = (data) => async dispatch => {
    dispatch({ type: CREATE_CUSTOM_FIELD_REQUEST });
    try {
        const response = await axiosInstance.post(`/custom-fields/create/update`, data);
        dispatch({ type: CREATE_CUSTOM_FIELD_SUCCESS, payload: response?.data });
        // console.log("data from Action", response?.data);
    } catch (error) {
        dispatch({ type: CREATE_CUSTOM_FIELD_FAILURE, payload: error.message });
    }
};



export const fetchCurrencies = (data) => async dispatch => {
    dispatch({ type: GET_CURRENCY_REQUEST });
    try {
        const response = await axiosInstance.post(`/get/currency`, data);
        dispatch({ type: GET_CURRENCY_SUCCESS, payload: response?.data });
        // console.log("data from Action", response?.data);
    } catch (error) {
        dispatch({ type: GET_CURRENCY_ERROR, payload: error.message });
    }
};


export const fetchTexRates = (data) => async dispatch => {
    dispatch({ type: GET_TAX_RATE_REQUEST });
    try {
        const response = await axiosInstance.post(`/taxrate/list`, data);
        dispatch({ type: GET_TAX_RATE_SUCCESS, payload: response?.data });
        // console.log("data from Action", response?.data);
    } catch (error) {
        dispatch({ type: GET_TAX_RATE_ERROR, payload: error.message });
    }
};


export const updateAddresses = (data) => async dispatch => {
    console.log("data actions", data)
    dispatch({ type: UPDATE_ADDRESS_REQUEST });
    try {
        const response = await axiosInstance.post(`/adreess/create/update`, data);
        dispatch({ type: UPDATE_ADDRESS_SUCCESS, payload: response?.data });
        if (response?.data?.message === 'Address update successfully') {
            toast.success(response?.data?.message);
        } else {
            toast.error(response?.data?.message);
        }
        console.log("data from Action", response?.data);
    } catch (error) {
        dispatch({ type: UPDATE_ADDRESS_ERROR, payload: error.message });
        toast.error("error while updating address");
    }
};

