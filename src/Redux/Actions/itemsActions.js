import axiosInstance from '../../Configs/axiosInstance';
import {
    ADD_ITMES_REQUEST,
    ADD_ITMES_SUCCESS,
    ADD_ITMES_ERROR,

    STOCK_ITMES_REQUEST,
    STOCK_ITMES_SUCCESS,
    STOCK_ITMES_ERROR,

    ITMES_DETAIL_REQUEST,
    ITMES_DETAIL_SUCCESS,
    ITMES_DETAIL_ERROR,

    ACITVE_INACTIVE_REQUEST,
    ACITVE_INACTIVE_SUCCESS,
    ACITVE_INACTIVE_FAILURE,

    ITEM_DELETE_REQUEST,
    ITEM_DELETE_SUCCESS,
    ITEM_DELETE_FAILURE,
} from "../Constants/itemsConstants";

export const addItems = (queryParams) => async (dispatch) => {
    try {
        console.log("queryParams", queryParams)
        dispatch({ type: ADD_ITMES_REQUEST });

        const { data } = await axiosInstance.post(`/item/create/update`,
            queryParams,
        );
        const { message, status } = data;
        dispatch({
            type: ADD_ITMES_SUCCESS,
            payload: {
                message,
                status
            },
        });

        console.log("data from actions", data);
    } catch (error) {
        dispatch({ type: ADD_ITMES_ERROR, payload: error.message });
    }
};

export const stockItemAdjustment = (queryParams) => async (dispatch) => {
    try {

        dispatch({ type: STOCK_ITMES_REQUEST });

        const { data } = await axiosInstance.post(`/item/stock/adjust`,
            queryParams,
        );

        dispatch({
            type: STOCK_ITMES_SUCCESS,
            payload: {
                data
            },
        });

        console.log("data from actions", data);
    } catch (error) {
        dispatch({ type: STOCK_ITMES_ERROR, payload: error.message });
    }
};

export const itemDetails = (queryParams) => async (dispatch) => {
    try {
        dispatch({ type: ITMES_DETAIL_REQUEST });
        const { data } = await axiosInstance.post('/item/details', queryParams);

        dispatch({
            type: ITMES_DETAIL_SUCCESS,
            payload: {
                data
            },
        });

        console.log("data from actions details", data);
    } catch (error) {
        dispatch({ type: ITMES_DETAIL_ERROR, payload: error.message });
    }
};

export const activeInActive = (data) => async dispatch => {
    dispatch({ type: ACITVE_INACTIVE_REQUEST });
    try {
        const response = await axiosInstance.post(`item/status`, data);
        dispatch({ type: ACITVE_INACTIVE_SUCCESS, payload: response?.data });
        console.log("data from Action", response?.data);
    } catch (error) {
        dispatch({ type: ACITVE_INACTIVE_FAILURE, payload: error.message });
    }
};
export const deleteItems = (data) => async dispatch => {
    dispatch({ type: ITEM_DELETE_REQUEST });
    try {
        const response = await axiosInstance.post(`item/delete`, data);
        dispatch({ type: ITEM_DELETE_SUCCESS, payload: response?.data });
        console.log("data from Action", response?.data);
    } catch (error) {
        dispatch({ type: ITEM_DELETE_FAILURE, payload: error.message });
    }
};

