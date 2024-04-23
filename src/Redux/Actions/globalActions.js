import axiosInstance from "../../Configs/axiosInstance";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
import {
    FETCH_MASTER_DATA_REQUEST,
    FETCH_MASTER_DATA_SUCCESS,
    FETCH_MASTER_DATA_FAILURE,

    COUNTRY_DATA_REQUEST,
    COUNTRY_DATA_SUCCESS,
    COUNTRY_DATA_FAILURE,

} from "../Constants/globalConstants";

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
    dispatch({ type: COUNTRY_DATA_REQUEST });
    try {
        const response = await axiosInstance.post(`/get/state`, data);
        dispatch({ type: COUNTRY_DATA_SUCCESS, payload: response?.data });
        console.log("state data from Action", response?.data);
    } catch (error) {
        dispatch({ type: COUNTRY_DATA_FAILURE, payload: error.message });
    }
};

export const fetchCities = (data) => async dispatch => {
    dispatch({ type: COUNTRY_DATA_REQUEST });
    try {
        const response = await axiosInstance.post(`get/city`, data);
        dispatch({ type: COUNTRY_DATA_SUCCESS, payload: response?.data });
        console.log("data from Action", response?.data);
    } catch (error) {
        dispatch({ type: COUNTRY_DATA_FAILURE, payload: error.message });
    }
};