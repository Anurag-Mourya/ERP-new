import toast from 'react-hot-toast';
import axiosInstance from '../../Configs/axiosInstance';
import {
    BILL_LIST_REQUEST,
    BILL_LIST_SUCCESS,
    BILL_LIST_ERROR,

    BILL_DETAILS_REQUEST,
    BILL_DETAILS_SUCCESS,
    BILL_DETAILS_ERROR,

    BILL_DELETE_REQUEST,
    BILL_DELETE_SUCCESS,
    BILL_DELETE_ERROR,

    PENDING_BILL_LIST_REQUEST,
    PENDING_BILL_LIST_SUCCESS,
    PENDING_BILL_LIST_ERROR,
} from '../Constants/billConstants';
import { Navigate } from 'react-router-dom';

export const pendingBillLists = (queryParams, setInoiceData) => async (dispatch) => {
    // console.log("queryParams", queryParams)
    dispatch({ type: PENDING_BILL_LIST_REQUEST });
    try {
        const response = await axiosInstance.post(`/purchase/bills/pending/vendor`,
            queryParams
        );
        setInoiceData(response?.data)
        dispatch({ type: PENDING_BILL_LIST_SUCCESS, payload: response.data });

    } catch (error) {
        dispatch({ type: PENDING_BILL_LIST_ERROR, payload: error.message });
    }
};


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


export const billDeletes = (queryParams, Navigate) => async (dispatch) => {
    // console.log("queryParams", queryParams)
    dispatch({ type: BILL_DELETE_REQUEST });
    try {
        const response = await axiosInstance.post(`/purchase/bills/delete`,
            queryParams
        );

        dispatch({ type: BILL_DELETE_SUCCESS, payload: response.data });
        if (response?.data?.message === "Bill deleted Successfully") {
            toast.success(response?.data?.message);
            Navigate("/dashboard/bills");
        } else {
            toast.error(response?.data?.message);
        }
    } catch (error) {
        dispatch({ type: BILL_DELETE_ERROR, payload: error.message });
        toast.error(response?.data?.message)
    }
};