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
} from "../Constants/itemsConstants";

export const addItems = (queryParams) => async (dispatch) => {
    try {

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

