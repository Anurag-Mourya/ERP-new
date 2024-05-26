import toast from 'react-hot-toast';
import axiosInstance from '../../Configs/axiosInstance';
import {
    BILL_LIST_REQUEST,
    BILL_LIST_SUCCESS,
    BILL_LIST_ERROR,

    BILL_DETAILS_REQUEST,
    BILL_DETAILS_SUCCESS,
    BILL_DETAILS_ERROR,
} from '../Constants/billConstants';

export const billLists = (queryParams) => async (dispatch) => {
    // console.log("queryParams", queryParams)
    dispatch({ type: BILL_LIST_REQUEST });
    try {
        const response = await axiosInstance.post(`/purchase/bills/list`,
            queryParams
        );

        dispatch({ type: BILL_LIST_SUCCESS, payload: response.data });

    } catch (error) {
        dispatch({ type: BILL_LIST_ERROR, payload: error.message });
    }
};


export const billDetails = (queryParams) => async (dispatch) => {
    // console.log("queryParams", queryParams)
    dispatch({ type: BILL_DETAILS_REQUEST });
    try {
        const response = await axiosInstance.post(`/purchase/bills/details`,
            queryParams
        );

        dispatch({ type: BILL_DETAILS_SUCCESS, payload: response.data });

    } catch (error) {
        dispatch({ type: BILL_DETAILS_ERROR, payload: error.message });
        toast.error(response?.data?.message)
    }
};