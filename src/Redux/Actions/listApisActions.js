import {
    FETCH_ITEM_LIST_DATA_REQUEST,
    FETCH_ITEM_LIST_DATA_SUCCESS,
    FETCH_ITEM_LIST_DATA_FAILURE,

    FETCH_CAT_LIST_DATA_REQUEST,
    FETCH_CAT_LIST_DATA_SUCCESS,
    FETCH_CAT_LIST_DATA_FAILURE,

    FETCH_ACC_LIST_DATA_REQUEST,
    FETCH_ACC_LIST_DATA_SUCCESS,
    FETCH_ACC_LIST_DATA_FAILURE,

    FETCH_QUOTE_LIST_DATA_REQUEST,
    FETCH_QUOTE_LIST_DATA_SUCCESS,
    FETCH_QUOTE_LIST_DATA_FAILURE,

    FETCH_SALE_LIST_DATA_REQUEST,
    FETCH_SALE_LIST_DATA_SUCCESS,
    FETCH_SALE_LIST_DATA_FAILURE,

    FETCH_INVOICE_LIST_DATA_REQUEST,
    FETCH_INVOICE_LIST_DATA_SUCCESS,
    FETCH_INVOICE_LIST_DATA_FAILURE,

    FETCH_CREDIT_LIST_DATA_REQUEST,
    FETCH_CREDIT_LIST_DATA_SUCCESS,
    FETCH_CREDIT_LIST_DATA_FAILURE,

    FETCH_VENDOR_LIST_DATA_REQUEST,
    FETCH_VENDOR_LIST_DATA_SUCCESS,
    FETCH_VENDOR_LIST_DATA_FAILURE,

    CUSTOM_FIELD_REQUEST,
    CUSTOM_FIELD_SUCCESS,
    CUSTOM_FIELD_FAILURE,
} from '../Constants/listApiConstants';

import axiosInstance from '../../Configs/axiosInstance';



export const categoryList = (params) => async dispatch => {
    dispatch({ type: FETCH_CAT_LIST_DATA_REQUEST });
    try {
        // Sending `params` as part of the request body
        const response = await axiosInstance.post(`/category/list`, params);
        dispatch({ type: FETCH_CAT_LIST_DATA_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FETCH_CAT_LIST_DATA_FAILURE, payload: error.message });
    }
};




export const itemLists = (data) => async dispatch => {
    dispatch({ type: FETCH_ITEM_LIST_DATA_REQUEST });
    try {
        const response = await axiosInstance.post(`/item/list`, data);
        dispatch({ type: FETCH_ITEM_LIST_DATA_SUCCESS, payload: response?.data });
        // console.log("data from Action", response?.data);
    } catch (error) {
        dispatch({ type: FETCH_ITEM_LIST_DATA_FAILURE, payload: error.message });
    }
};


export const accountLists = (data) => async dispatch => {
    dispatch({ type: FETCH_ACC_LIST_DATA_REQUEST });
    try {
        const response = await axiosInstance.post(`/accounts/list`, data);
        dispatch({ type: FETCH_ACC_LIST_DATA_SUCCESS, payload: response?.data });
        // console.log("data from Action", response?.data);
    } catch (error) {
        dispatch({ type: FETCH_ACC_LIST_DATA_FAILURE, payload: error.message });
    }
};


export const quotationLists = (data) => async dispatch => {
    dispatch({ type: FETCH_QUOTE_LIST_DATA_REQUEST });
    try {
        const response = await axiosInstance.post(`/quotations/list`, data);
        dispatch({ type: FETCH_QUOTE_LIST_DATA_SUCCESS, payload: response?.data });
        // console.log("data from Action", response?.data);
    } catch (error) {
        dispatch({ type: FETCH_QUOTE_LIST_DATA_FAILURE, payload: error.message });
    }
};


export const saleOrderLists = (data) => async dispatch => {
    dispatch({ type: FETCH_SALE_LIST_DATA_REQUEST });
    try {
        const response = await axiosInstance.post(`/sales-order/list`, data);
        dispatch({ type: FETCH_SALE_LIST_DATA_SUCCESS, payload: response?.data });
        // console.log("data from Action", response?.data);
    } catch (error) {
        dispatch({ type: FETCH_SALE_LIST_DATA_FAILURE, payload: error.message });
    }
};


export const invoiceLists = (data) => async dispatch => {
    dispatch({ type: FETCH_INVOICE_LIST_DATA_REQUEST });
    try {
        const response = await axiosInstance.post(`/invoice/list`, data);
        dispatch({ type: FETCH_INVOICE_LIST_DATA_SUCCESS, payload: response?.data });
        // console.log("data from Action", response?.data);
    } catch (error) {
        dispatch({ type: FETCH_INVOICE_LIST_DATA_FAILURE, payload: error.message });
    }
};


export const creditNoteLists = (data) => async dispatch => {
    dispatch({ type: FETCH_CREDIT_LIST_DATA_REQUEST });
    try {
        const response = await axiosInstance.post(`/credit-note/list`, data);
        dispatch({ type: FETCH_CREDIT_LIST_DATA_SUCCESS, payload: response?.data });
        // console.log("data from Action", response?.data);
    } catch (error) {
        dispatch({ type: FETCH_CREDIT_LIST_DATA_FAILURE, payload: error.message });
    }
};

export const vendorsLists = (data) => async dispatch => {
    dispatch({ type: FETCH_VENDOR_LIST_DATA_REQUEST });
    try {
        const response = await axiosInstance.post(`/vendors/list?is_vendor=1`, data);
        dispatch({ type: FETCH_VENDOR_LIST_DATA_SUCCESS, payload: response?.data });
        // console.log("data from Action", response?.data);
    } catch (error) {
        dispatch({ type: FETCH_VENDOR_LIST_DATA_FAILURE, payload: error.message });
    }
};

export const customFieldsLists = (data) => async dispatch => {
    dispatch({ type: CUSTOM_FIELD_REQUEST });
    try {
        const response = await axiosInstance.post(`/custom-fields/list`, data);
        dispatch({ type: CUSTOM_FIELD_SUCCESS, payload: response?.data });
        // console.log("data from Action", response?.data);
    } catch (error) {
        dispatch({ type: CUSTOM_FIELD_FAILURE, payload: error.message });
    }
};